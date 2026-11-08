import Image from "next/image";
import { useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Download, GraduationCap } from "lucide-react";
import { memo, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { CertificatePreview, type CertificateOrigin } from "@/components/ui/CertificatePreview";
import { certificates, type Certificate } from "@/lib/certificates";

const learningRecords = [
    {
        category: "Course · Elective", date: "May 2026 · 27 hours",
        title: "AWS Fundamentals Elective", organization: "Zuitt Learning Institute",
        label: "Modules", topics: ["EC2", "S3", "DynamoDB", "Lambda"],
        certificate: certificates.aws,
    },
    {
        category: "Hackathon", date: "Jul 2026",
        title: "eGovPH Hackathon 2026", organization: "DICT · SMX Aura",
        label: "Role", detail: "Contributor & participant",
        certificate: certificates.egovph,
    },
    {
        category: "Course", date: "Apr 2025",
        title: "Introduction to Android Mobile Application Development", organization: "Meta · Coursera",
        label: "Focus", detail: "Android application development",
        certificate: certificates.android,
    },
];

// Only the surface moves; the wrapper keeps a stable footprint while hovering.
function AboutCard({ children, className = "", delay = 0, onOpen, actionLabel, expanded = false }: {
    children: ReactNode;
    className?: string;
    delay?: number;
    onOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
    actionLabel?: string;
    expanded?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useInView(ref, { once: true, amount: 0.15 });
    return (
        <div ref={ref} className={`about-profile-card ${className}`} data-visible={visible} style={{ "--about-card-delay": `${delay}ms` } as CSSProperties}>
            <div className="about-profile-card-surface">{children}</div>
            {onOpen && <button type="button" className="about-profile-card-trigger" onClick={onOpen} aria-label={actionLabel} aria-haspopup="dialog" aria-expanded={expanded} />}
        </div>
    );
}

export const AboutProfile = memo(function AboutProfile({ active = false }: { active?: boolean }) {
    const [preview, setPreview] = useState<{ certificate: Certificate; origin: CertificateOrigin } | null>(null);
    const learningRef = useRef<HTMLElement>(null);
    const learningInView = useInView(learningRef, { once: true, margin: "0px 0px -80px 0px" });
    const [hasScrolled, setHasScrolled] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", value => setHasScrolled(value > 24));

    function openCertificate(certificate: Certificate, event: MouseEvent<HTMLButtonElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPreview({ certificate, origin: { x: bounds.x + bounds.width / 2 - window.innerWidth / 2, y: bounds.y + bounds.height / 2 - window.innerHeight / 2 } });
    }

    return (
        <div className="about-profile" data-active={active}>
            <div className="about-profile-board">
                <div className="about-profile-copy">
                    <h2 id="about-profile-title">What shapes my work.</h2>
                    <div className="about-profile-description">
                        <p>I build web and mobile applications with a strong backend foundation—reliable APIs, thoughtful data design, and security from the start.</p>
                        <p>Full-stack development, secure architecture, and practical AI are where my curiosity meets real-world problems.</p>
                    </div>
                    <AboutCard className="about-profile-records">
                        <section aria-labelledby="about-records-title">
                            <h3 id="about-records-title">Education &amp; experience</h3>
                            <div className="about-profile-record">
                                <GraduationCap aria-hidden="true" />
                                <div>
                                    <div className="about-profile-record-meta">
                                        <span>2023 — Expected 2027</span>
                                        <span>Fourth-year student</span>
                                    </div>
                                    <h4>BS Information Technology</h4>
                                    <p>PHINMA University of Pangasinan</p>
                                </div>
                            </div>
                            <div className="about-profile-record">
                                <BriefcaseBusiness aria-hidden="true" />
                                <div>
                                    <p className="about-profile-record-meta">Dec 2025 — Sep 2026</p>
                                    <h4>Full-Stack Developer <span>·</span> Gig Groove Hub</h4>
                                    <p>Websites, mobile apps, delivery workflows, and API integrations.</p>
                                </div>
                            </div>
                        </section>
                    </AboutCard>
                    <a className="about-profile-resume" href="/file/Karlossonrivo_Resume.pdf" download>
                        Download my résumé <Download size={16} aria-hidden="true" />
                    </a>
                </div>
                <div className="about-profile-right">
                    <span className="about-profile-watermark" aria-hidden="true">SYSTEMS.</span>
                    <span className="about-profile-callout about-profile-callout-web" aria-hidden="true"><i />Web &amp; mobile<span /></span>
                    <span className="about-profile-callout about-profile-callout-backend" aria-hidden="true"><span /><i />Backend &amp; AI</span>
                    <div className="about-profile-photo">
                        <Image src="/images/karlos-rivo-about-crossed-arms.png" alt="Karlos Son Rivo with arms crossed, wearing a charcoal crewneck shirt" width={1024} height={1536} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 60vw, 40vw" unoptimized />
                    </div>
                </div>
            </div>
            <section ref={learningRef} className="about-profile-learning" data-visible={hasScrolled && learningInView} aria-labelledby="about-learning">
                <h3 id="about-learning">Certificates &amp; seminars</h3>
                <div className="about-profile-learning-grid">
                    {learningRecords.map((record, index) => (
                        <article className="about-profile-learning-card" key={record.title}>
                            <AboutCard
                                delay={(index + 1) * 80}
                                onOpen={record.certificate ? event => openCertificate(record.certificate, event) : undefined}
                                actionLabel={`View certificate: ${record.title}`}
                                expanded={preview?.certificate.id === record.certificate?.id}
                            >
                                <div>
                                    <div className="about-profile-learning-meta"><span>{record.category}</span><span>{record.date}</span></div>
                                    <h4>{record.title}</h4>
                                    <p>{record.organization}</p>
                                </div>
                                <div className={record.topics ? "about-profile-modules" : "about-profile-learning-detail"}>
                                    <span>{record.label}</span>
                                    {record.topics ? <ul>{record.topics.map(topic => <li key={topic}>{topic}</li>)}</ul> : <p>{record.detail}</p>}
                                </div>
                                {record.certificate && <span className="about-profile-certificate-action" aria-hidden="true">View certificate <ArrowUpRight size={16} /></span>}
                            </AboutCard>
                        </article>
                    ))}
                </div>
            </section>
            {preview && <CertificatePreview key={preview.certificate.id} certificate={preview.certificate} origin={preview.origin} onClose={() => setPreview(null)} />}
        </div>
    );
});
