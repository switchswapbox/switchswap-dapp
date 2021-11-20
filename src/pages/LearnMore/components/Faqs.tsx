import { Container, Typography } from '@mui/material';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { varFadeIn, MotionInView } from '../../../components/animate/index';
import Page from '../../../components/Page';
import { styled } from '@mui/material/styles';

import { Icon } from '@iconify/react';

import { FaqsType } from './FaqsConfig';

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0)
  }
}));

export default function Faqs({ title, FaqsList }: { title: string; FaqsList: FaqsType[] }) {
  return (
    <RootStyle title="Learn More">
      <Container sx={{ mt: 0, mb: 3 }}>
        <MotionInView variants={varFadeIn}>
          <Typography variant="h5">{title}</Typography>
          {FaqsList.map((accordion) => (
            <Accordion key={accordion.key}>
              <AccordionSummary
                expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
              >
                <Typography variant="subtitle1">{accordion.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: 'pre-wrap' }}>{accordion.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
