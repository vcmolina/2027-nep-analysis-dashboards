import React from 'react';

interface SectionHeaderProps {
  number?: number;
  title: string;
  subtitle?: string;
  badge?: string;
  metric?: {
    value: string;
    label: string;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <div className="border-b border-slate-800/80 pb-8 mb-10">
      <div className="w-full">
        {/* Main Section Heading: At least 3x larger than subheadings */}
        <h2 className="text-3xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] lg:leading-[1.05] font-display font-normal text-[#F8FAFC] tracking-tight">
          {title}
        </h2>

        {/* Subheading / Subtitle in Italic Serif */}
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-400 italic font-serif leading-relaxed max-w-5xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
