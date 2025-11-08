
import React from 'react';

// Base Icon Props
const iconProps = {
    className: "w-full h-full",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

// 1. Notebook LLM Public
export const NotebookIcon = () => (
    <svg {...iconProps}>
        <path d="M4 6h16M4 12h16M4 18h11" stroke="black" />
        <path d="M3 3v18h13l5-5V3H3z" stroke="#168a40" />
        <path d="M15 2v5h5" stroke="#168a40" />
    </svg>
);

// 2. ChatGPTs
export const CloudIcon = () => (
    <svg {...iconProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="black"/>
        <path d="M12 12l-2 2 2 2" stroke="#168a40" />
        <path d="M16 12l2 2-2 2" stroke="#168a40" />
    </svg>
);

// 3. Hướng dẫn nhập Problem/Statement
export const SparkleIcon = () => (
    <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#168a40" />
        <path d="M12 8v8m-4-4h8" stroke="black" strokeWidth="2" />
    </svg>
);


// 4. Văn bản và tài liệu
export const DocumentIcon = () => (
    <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="black" />
        <path d="M14 2v6h6" stroke="black" />
        <path d="M16 13H8" stroke="#168a40" />
        <path d="M16 17H8" stroke="#168a40" />
        <path d="M10 9H8" stroke="#168a40" />
    </svg>
);

// 5. Quản lý Admin
export const UsersIcon = () => (
    <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="black" />
        <circle cx="9" cy="7" r="4" stroke="black" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#168a40" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#168a40" />
    </svg>
);

// 6. Gửi ý kiến / Góp ý
export const FormIcon = () => (
    <svg {...iconProps}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="black" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="#168a40" />
        <path d="M10 12h4" stroke="#168a40" />
        <path d="M10 16h4" stroke="#168a40" />
    </svg>
);