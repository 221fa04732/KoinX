import { useRecoilValue } from 'recoil';
import { modeatom } from '../store/mode';
import { useState } from 'react';

export default function Disclaimer() {

    const mode = useRecoilValue(modeatom)
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const disclaimerPoints = [
        "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions." ,
        "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules." ,
        "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchang ",
        "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term." ,
        "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted."
    ];

    return (
        <div className={`border border-blue-800 rounded-md ${mode === 'light' ? "text-black " : "text-white bg-cyan-800"} my-2`}>
        <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-leftrounded-lg focus:outline-none "
        >
            <div>Important Notes & Disclaimer</div>
            <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
            </svg>
        </button>

        {isOpen && (
            <div className="px-4 pb-2">
            <ul className="space-y-1 list-disc pl-5">
                {disclaimerPoints.map((point, index) => (
                <li key={index} className='text-sm'>
                    {point}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}