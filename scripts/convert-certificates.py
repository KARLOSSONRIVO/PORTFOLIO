"""Export supplied certificates for the statically hosted portfolio.

Run: uv --system-certs run --python 3.12 --with pymupdf --with pillow python scripts/convert-certificates.py
PDF text is outlined to preserve the original typography without web fonts.
The PNG is embedded unchanged in an SVG container; it remains raster artwork.
"""

from base64 import b64encode
from html import escape
from pathlib import Path
from shutil import copyfile
import json
import xml.etree.ElementTree as ET

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/Certificates-20261107T063518Z-1-001/Certificates"
OUTPUT = ROOT / "public/certificates"
RECORDS = [
    ("Karlos Son Rivo Certificate.pdf", "aws-fundamentals", "AWS Fundamentals Elective"),
    ("KARLOS SON RIVO.png", "egovph-hackathon", "eGovPH Hackathon 2026"),
    ("Coursera 15NOYM97848G.pdf", "meta-android", "Introduction to Android Mobile Application Development"),
]


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "original").mkdir(exist_ok=True)
    manifest = []
    for filename, slug, title in RECORDS:
        source = SOURCE / filename
        if source.suffix == ".pdf":
            with pymupdf.open(source) as document:
                if len(document) != 1:
                    raise ValueError(f"Review multipage certificate before export: {filename}")
                page = document[0]
                width, height = page.rect.width, page.rect.height
                svg = page.get_svg_image(text_as_path=True)
                start = svg.index(">") + 1
                svg = svg[:start] + f'<title>{escape(title)}</title><rect width="100%" height="100%" fill="white"/>' + svg[start:]
            mode = "PDF vector artwork with outlined text and original embedded images"
        else:
            with Image.open(source) as image:
                width, height = image.size
            encoded = b64encode(source.read_bytes()).decode("ascii")
            svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">'
                   f'<title>{escape(title)}</title><image width="{width}" height="{height}" href="data:image/png;base64,{encoded}"/></svg>')
            mode = "Original PNG embedded losslessly; raster artwork in SVG"
        # Only generated, self-contained SVG is published, without active content.
        tree = ET.fromstring(svg)
        for node in tree.iter():
            if node.tag.rsplit("}", 1)[-1] in {"script", "foreignObject"}:
                raise ValueError("Unexpected active SVG content")
            for key, value in node.attrib.items():
                if key.startswith("on") or (key.endswith("href") and not value.startswith(("#", "data:image/"))):
                    raise ValueError("Unexpected external SVG reference")
        (OUTPUT / f"{slug}.svg").write_text(svg, encoding="utf-8")
        original = f"original/{slug}{source.suffix.lower()}"
        copyfile(source, OUTPUT / original)
        manifest.append({"slug": slug, "title": title, "width": width, "height": height, "source": filename, "conversion": mode})
        print(f"{slug}.svg: {width:g} x {height:g}, {len(svg.encode()):,} bytes")
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
