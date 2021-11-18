// material
import { Grid, Container, Typography } from '@mui/material';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { varFadeIn, MotionInView } from './animate/index';
// hooks

// components
import Page from './Page';
import { styled } from '@mui/material/styles';

import { Icon } from '@iconify/react';

import { Block } from './Block';
import { FaqsType } from './_external-pages/faqs/FaqsConfig';

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
      <Container sx={{ mt: 0, mb: 0 }}>
        <Block sx={{ '& > *': { mx: 1, my: 1 } }} title={title}>
          <MotionInView variants={varFadeIn}>
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
        </Block>
      </Container>
    </RootStyle>
  );
}
