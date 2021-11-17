import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const MOCK_FAQS = [...Array(12)].map((_, index) => ({
  id: mockData.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}: ${mockData.text.sentence(index)}`,
  detail: mockData.text.description(index)
}));

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <MotionInView variants={varFadeIn}>
      {MOCK_FAQS.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary
            expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MotionInView>
  );
}
