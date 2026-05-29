import React from 'react';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { metadata } from './metadata';
import { content } from './content';

export default function DreamHolidaysPage() {
    return <CaseStudyTemplate metadata={metadata} content={content} />;
}
