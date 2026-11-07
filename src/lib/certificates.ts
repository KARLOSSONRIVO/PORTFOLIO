export type Certificate = {
    id: string;
    title: string;
    issuer: string;
    date: string;
    src: string;
    original: string;
    width: number;
    height: number;
};

export const certificates = {
    aws: {
        id: "aws-fundamentals",
        title: "AWS Fundamentals Elective",
        issuer: "Zuitt Learning Institute",
        date: "May 21, 2026 · 27 hours",
        src: "/certificates/aws-fundamentals.svg",
        original: "/certificates/original/aws-fundamentals.pdf",
        width: 792, height: 612,
    },
    egovph: {
        id: "egovph-hackathon",
        title: "eGovPH Hackathon 2026",
        issuer: "Department of Information and Communications Technology",
        date: "July 22, 2026",
        src: "/certificates/egovph-hackathon.svg",
        original: "/certificates/original/egovph-hackathon.png",
        width: 3753, height: 2652,
    },
    android: {
        id: "meta-android",
        title: "Introduction to Android Mobile Application Development",
        issuer: "Meta · Coursera",
        date: "April 16, 2025",
        src: "/certificates/meta-android.svg",
        original: "/certificates/original/meta-android.pdf",
        width: 792, height: 612,
    },
} satisfies Record<string, Certificate>;
