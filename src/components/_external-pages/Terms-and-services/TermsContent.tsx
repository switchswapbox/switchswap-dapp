import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const mock = [
  {
    title: 'INTRODUCTION',
    description:
      'Welcome to https://switchswap.io, a website-hosted user interface (the ”Interface” or ”App”) provided by Switchswap (”we”, ”our”, or ”us”). The Interface provides access to a decentralized protocol on the Polygon blockchain that allows users to trade certain digital assets.'
  },
  {
    title: '',
    description:
      'This Terms of Service Agreement (the ”Agreement”) explains the terms and conditions by which you may access and use the Interface. You must read this Agreement carefully. By accessing or using the Interface, you signify that you have read, understand, and agree to be bound by this Agreement in its entirety. If you do not agree, you are not authorized to access or use the Interface and should not use the Interface.'
  },
  {
    title:
      'NOTICE: Please read these Terms and the Privacy Policy carefully as they govern your use of the Interface. The Terms contain important information, including a binding arbitration provision and a class action waiver, both of which impact your rights as to how disputes are resolved. The Services are only available to you—and you should only access the Interface—if you agree completely with the Terms.',
    description: ''
  },
  {
    title: '1. Modification of this Agreement',
    description:
      'We reserve the right, in our sole discretion, to modify this Agreement from time to time. If we make any modifications, we will notify you by updating the date at the top of the Agreement and by maintaining a current version of the Agreement at https://switchswap.io/#/terms-of-service. All modifications will be effective when they are posted, and your continued accessing or use of the Interface will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Interface.'
  },
  {
    title: '2. Eligibility',
    description:
      'To access or use the Interface, you must be able to form a legally binding contract with us. Accordingly, you represent that you are at least the age of majority in your jurisdiction (e.g., eighteen years old) and have the full right, power, and authority to enter into and comply with the terms and conditions of this Agreement on behalf of yourself and any company or legal entity for which you may access or use the Interface. You further represent that you are not a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the United States, or where your use of the Interface would be illegal or otherwise violate any applicable law. You further represent that your access and use of the Interface will fully comply with all applicable laws and regulations, and that you will not access or use the Interface to conduct, promote, or otherwise facilitate any illegal activity.'
  },
  {
    title: '3. Proprietary Rights',
    description:
      'We own all intellectual property and other rights in the Interface and its contents, including (but not limited to) software, text, images, trademarks, service marks, copyrights, patents, and designs. This intellectual property is available under the terms of our copyright licenses and our Trademark Policy. Unlike the Interface, the smart contracts are comprised entirely of open-source or source-available software running on the public Polygon blockchain.'
  },
  {
    title: '4. Additional Rights.',
    description:
      'We reserve the following rights, which do not constitute obligations of ours: (a) with or without notice to you, to modify, substitute, eliminate or add to the Interface; (b) to review, modify, filter, disable, delete and remove any and all content and information from the Interface; and (c) to cooperate with any law enforcement, court or government investigation or order or third party requesting or directing that we disclose information or content or information that you provide.'
  },
  {
    title: '5. Privacy',
    description:
      'We care about your privacy. When you use the Interface, we do not collect any personally identifiable information (”PII”) from you (e.g., Polygon address, IP address, or transaction amounts). We do, however, use third-party service providers, like Infura, Cloudflare, and Google Analytics, which may receive your PII. We do not control how these third parties handle your data and you should review their privacy policies to understand how they collect, use, and share your PII. In particular, please visit https://policies.google.com/technologies/partner-sites to learn more about how Google uses data. By accessing and using the Interface, you understand and consent to our data practices and our service providers’ treatment of your information.'
  },
  {
    title: '',
    description:
      'Additionally, when you use the Interface, you are interacting with the Ethereum blockchain, which provides transparency into your transactions. Uniswap Labs does not control and is not responsible for any information you make public on the Ethereum blockchain by taking actions through the Interface.'
  },
  {
    title: '6. Prohibited Activity',
    description:
      'You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity in relation to your access and use of the Interface:'
  },
  {
    title: '',
    description:
      '&copy; Intellectual Property Infringement. Activity that infringes on or violates any copyright, trademark, service mark, patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under the law.'
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  },
  {
    title: '',
    description: ''
  }
];

const PrivacySection = ({ title, description }: { title: string; description: string }) => {
  return (
    <Box>
      <Typography
        variant={'h6'}
        gutterBottom
        sx={{
          fontWeight: 'medium'
        }}
      >
        {title}
      </Typography>
      <Typography component={'p'} color={'text.secondary'}>
        {description}
      </Typography>
    </Box>
  );
};

const Content = (): JSX.Element => {
  return (
    <Box>
      {mock.map((item, i) => (
        <Box key={i} marginBottom={i < mock.length - 1 ? 4 : 0}>
          <PrivacySection {...item} />
        </Box>
      ))}
    </Box>
  );
};

export default Content;
