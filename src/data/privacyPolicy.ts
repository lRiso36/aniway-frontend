// src/lib/privacyPolicyContent.ts
export type ContentItem = {
  type: 'title' | 'subtitle' | 'paragraph' | 'list';
  text?: string;
  items?: string[];
};

export const policyUpdatedAt: string = 'Last updated October 02, 2026';
export const privacyPolicyContent: ContentItem[] = [
  {
    type: 'paragraph',
    text: 'This Privacy Notice for Aniway ("we," "us," or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you visit our website or engage with us in other related ways.',
  },
  {
    type: 'paragraph',
    text: 'Questions or concerns? If you do not agree with our policies and practices, please do not use our Services. If you still have questions, contact us at aniway.admin@gmail.com.',
  },

  // 1
  { type: 'title', text: '1. What information do we collect?' },
  { type: 'subtitle', text: 'Personal information you disclose to us' },
  {
    type: 'paragraph',
    text: 'We collect personal information that you voluntarily provide when you register on the Services, participate in activities on the Services, or contact us. This may include:',
  },
  {
    type: 'list',
    items: ['Names', 'Email addresses', 'Usernames', 'Passwords'],
  },
  {
    type: 'paragraph',
    text: 'We do not process sensitive personal information.',
  },
  {
    type: 'paragraph',
    text: 'Social Media Login Data. You can register with us using your Google account. If you do, we collect certain profile information from Google, as described in section 6 below.',
  },
  {
    type: 'paragraph',
    text: 'All personal information you provide must be true, complete, and accurate, and you must notify us of any changes.',
  },
  { type: 'subtitle', text: 'Information automatically collected' },
  {
    type: 'paragraph',
    text: 'Some information, such as your IP address and browser and device characteristics, is collected automatically when you visit our Services. It does not reveal your specific identity, but may include your IP address, browser and device characteristics, operating system, language preferences, referring URLs, country, and how and when you use our Services. This is primarily needed to maintain the security and operation of our Services, and for internal analytics and reporting.',
  },
  { type: 'paragraph', text: 'The information we collect includes:' },
  {
    type: 'list',
    items: [
      'Log and Usage Data. Service-related, diagnostic, usage, and performance information our servers record in log files when you use our Services, such as your IP address, browser type and settings, and your activity in the Services (date/time stamps, pages viewed, and features used).',
    ],
  },
  { type: 'subtitle', text: 'Google API' },
  {
    type: 'paragraph',
    text: 'Our use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.',
  },

  // 2
  { type: 'title', text: '2. How do we process your information?' },
  {
    type: 'paragraph',
    text: 'We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes only with your prior explicit consent.',
  },
  {
    type: 'list',
    items: [
      'To facilitate account creation and authentication and otherwise manage user accounts.',
      'To deliver and facilitate delivery of services to the user.',
      'To respond to user inquiries and offer support.',
      'To send administrative information to you, such as changes to our terms and policies.',
      'To enable user-to-user communications if you choose to use features that allow them.',
      'To request feedback and contact you about your use of our Services.',
      'To protect our Services, including fraud monitoring and prevention.',
      'To comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.',
    ],
  },
  // 3
  {
    type: 'title',
    text: '3. What legal bases do we rely on to process your information?',
  },
  {
    type: 'paragraph',
    text: 'We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law, like with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill our legitimate business interests.',
  },
  {
    type: 'subtitle',
    text: 'If you are located in Canada, this section applies to you.',
  },
  {
    type: 'paragraph',
    text: 'We may process your information if you have given us specific permission (express consent) or in situations where your permission can be inferred (implied consent). You can withdraw your consent at any time. In some exceptional cases, we may be legally permitted to process your information without your consent, including, for example:',
  },
  {
    type: 'list',
    items: [
      'If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way',
      'For investigations and fraud detection and prevention',
      'For business transactions provided certain conditions are met',
      'If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court',
      'If the information is publicly available and is specified by the regulations',
      'We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments',
    ],
  },

  // 4
  {
    type: 'title',
    text: '4. When and with whom do we share your personal information?',
  },
  {
    type: 'paragraph',
    text: 'We may need to share your personal information in the following situations:',
  },
  {
    type: 'list',
    items: [
      'Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
      'Service Providers. We use third-party providers, such as our email service, to help operate the Services (for example, sending account emails). They receive only the information needed to do that work.',
    ],
  },

  // 5
  {
    type: 'title',
    text: '5. Do we use cookies and other tracking technologies?',
  },
  {
    type: 'paragraph',
    text: 'We use cookies and similar technologies only where needed to run the Services, such as keeping you logged in, securing your account, preventing crashes, and saving your preferences. We do not use cookies for advertising, and we do not allow third parties to use tracking technologies on our Services for advertising.',
  },
  {
    type: 'paragraph',
    text: 'Most web browsers accept cookies by default. You can usually set your browser to remove or reject cookies, but this could affect certain features of our Services, including staying logged in.',
  },

  // 6
  { type: 'title', text: '6. How do we handle your social logins?' },
  {
    type: 'paragraph',
    text: 'If you choose to register or log in using your Google account, we will receive certain profile information about you from Google. This will often include your name, email address, and profile picture, as well as other information you choose to make public.',
  },
  {
    type: 'paragraph',
    text: 'We will use the information we receive only for the purposes described in this Privacy Notice. We do not control, and are not responsible for, other uses of your personal information by Google. We recommend that you review their privacy notice to understand how they collect, use, and share your information.',
  },
  // 3
  {
    type: 'title',
    text: '3. What legal bases do we rely on to process your information?',
  },
  {
    type: 'paragraph',
    text: 'We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law, like with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill our legitimate business interests.',
  },
  {
    type: 'subtitle',
    text: 'If you are located in Canada, this section applies to you.',
  },
  {
    type: 'paragraph',
    text: 'We may process your information if you have given us specific permission (express consent) or in situations where your permission can be inferred (implied consent). You can withdraw your consent at any time. In some exceptional cases, we may be legally permitted to process your information without your consent, including, for example:',
  },
  {
    type: 'list',
    items: [
      'If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way',
      'For investigations and fraud detection and prevention',
      'For business transactions provided certain conditions are met',
      'If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court',
      'If the information is publicly available and is specified by the regulations',
      'We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments',
    ],
  },

  // 4
  {
    type: 'title',
    text: '4. When and with whom do we share your personal information?',
  },
  {
    type: 'paragraph',
    text: 'We may need to share your personal information in the following situations:',
  },
  {
    type: 'list',
    items: [
      'Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
      'Service Providers. We use third-party providers, such as our email service, to help operate the Services (for example, sending account emails). They receive only the information needed to do that work.',
    ],
  },

  // 5
  {
    type: 'title',
    text: '5. Do we use cookies and other tracking technologies?',
  },
  {
    type: 'paragraph',
    text: 'We use cookies and similar technologies only where needed to run the Services, such as keeping you logged in, securing your account, preventing crashes, and saving your preferences. We do not use cookies for advertising, and we do not allow third parties to use tracking technologies on our Services for advertising.',
  },
  {
    type: 'paragraph',
    text: 'Most web browsers accept cookies by default. You can usually set your browser to remove or reject cookies, but this could affect certain features of our Services, including staying logged in.',
  },

  // 6
  { type: 'title', text: '6. How do we handle your social logins?' },
  {
    type: 'paragraph',
    text: 'If you choose to register or log in using your Google account, we will receive certain profile information about you from Google. This will often include your name, email address, and profile picture, as well as other information you choose to make public.',
  },
  {
    type: 'paragraph',
    text: 'We will use the information we receive only for the purposes described in this Privacy Notice. We do not control, and are not responsible for, other uses of your personal information by Google. We recommend that you review their privacy notice to understand how they collect, use, and share your information.',
  },
];
