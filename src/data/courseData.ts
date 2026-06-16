export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: SlideContent;
  type: 'intro' | 'info' | 'example' | 'tactics' | 'tips' | 'quiz' | 'completion';
}

export interface SlideContent {
  body?: string;
  bullets?: { icon: string; text: string; detail?: string }[];
  emailExample?: EmailExample;
  websiteExample?: WebsiteExample;
  tactics?: Tactic[];
  tips?: Tip[];
  quiz?: QuizQuestion;
  stats?: Stat[];
}

export interface EmailExample {
  type: 'legit' | 'phishing';
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  redFlags?: string[];
  greenFlags?: string[];
}

export interface WebsiteExample {
  type: 'legit' | 'phishing';
  url: string;
  title: string;
  description: string;
  redFlags?: string[];
  greenFlags?: string[];
}

export interface Tactic {
  name: string;
  icon: string;
  color: string;
  description: string;
  example: string;
}

export interface Tip {
  icon: string;
  title: string;
  description: string;
  detail?: string;
  color: string;
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface QuizQuestion {
  question: string;
  scenario?: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

export const slides: Slide[] = [
  // ========== INTRO ==========
  {
    id: 0,
    type: 'intro',
    title: 'Phishing Awareness Training',
    subtitle: 'Protect yourself and your organization from cyber threats',
    content: {
      stats: [
        { value: '3.4B', label: 'Phishing emails sent daily', color: 'text-red-400' },
        { value: '83%', label: 'Of organizations faced phishing in 2023', color: 'text-orange-400' },
        { value: '$4.91M', label: 'Avg. cost of a phishing breach', color: 'text-yellow-400' },
        { value: '97%', label: 'Of users can\'t identify phishing', color: 'text-red-400' },
      ],
    },
  },
  // ========== CORE CONCEPTS ==========
  {
    id: 1,
    type: 'info',
    title: 'What is Phishing?',
    subtitle: 'Understanding the threat landscape',
    content: {
      body: 'Phishing is a type of cyberattack where attackers impersonate trusted entities to steal sensitive information such as passwords, credit card numbers, and personal data.',
      bullets: [
        { icon: '🎣', text: 'Email Phishing', detail: 'Mass‑produced emails sent to thousands of people, pretending to be from banks, online services, or colleagues. **Analogy:** Like throwing a wide fishing net into the ocean – attackers hope a few fish bite. **Example:** An email claiming to be from Netflix saying your payment failed, with a link to a fake login page.' },
        { icon: '🎯', text: 'Spear Phishing', detail: 'Highly targeted attacks on specific individuals or companies. Attackers research their victims (job title, interests, recent purchases) to craft convincing messages. **Analogy:** Spear fishing – you aim at one particular fish, not the whole school. **Example:** An email to the finance department that appears to be from the CEO asking to wire money to a fake vendor.' },
        { icon: '🐋', text: 'Whaling', detail: 'A subtype of spear phishing that targets high‑profile executives (CEOs, CFOs, politicians). **Analogy:** Whaling – going after the biggest catch. **Example:** A fake subpoena sent to a company’s legal counsel, demanding immediate login to a secure document portal.' },
        { icon: '📱', text: 'Smishing & Vishing', detail: 'Smishing uses SMS text messages; vishing uses phone calls. Attackers impersonate banks, delivery services, or government agencies. **Analogy:** Instead of an email hook, they use a text message or phone call as bait. **Example (Smishing):** “Your package cannot be delivered – click here to reschedule.” **Example (Vishing):** A call from “Microsoft Support” saying your computer has a virus and they need remote access.' },
        { icon: '🌐', text: 'Clone Phishing', detail: 'Attackers copy (clone) a legitimate email you previously received, replace links or attachments with malicious ones, and resend it from a spoofed address. **Analogy:** Like a counterfeit key – it looks identical, but opens the wrong door. **Example:** You receive a second “invoice” email that looks exactly like the real one from your vendor, but the attachment contains malware.' },
        { icon: '💻', text: 'Pharming', detail: 'Attackers poison the DNS (domain name system) or your local hosts file so that when you type a legitimate website address, you are secretly redirected to a fake one. **Analogy:** Changing the road signs so drivers unknowingly end up at a fake bank. **Example:** You type “paypal.com” but your browser is taken to a phishing site that looks identical, without any warning.' },
      ],
    },
  },
  // ========== EXAMPLES ==========
  {
    id: 2,
    type: 'example',
    title: 'Spot the Phishing Email',
    subtitle: 'Real-world email example — can you identify the red flags?',
    content: {
      emailExample: {
        type: 'phishing',
        from: 'PayPal Security Team',
        fromEmail: 'security@paypa1-alerts.com',
        subject: '⚠️ URGENT: Your account has been suspended!',
        preview: 'Immediate action required to restore your account...',
        body: `Dear Valued Customer,

We have detected suspicious activity on your PayPal account. Your account has been temporarily suspended to protect your security.

To restore access, you must verify your information IMMEDIATELY by clicking the button below. Failure to verify within 24 hours will result in permanent account closure.

[VERIFY MY ACCOUNT NOW]

Thank you for your cooperation.
PayPal Security Department`,
        redFlags: [
          'Sender email uses "paypa1" (number 1 instead of letter l)',
          'Creates artificial urgency with "IMMEDIATE" and "24 hours"',
          'Threatens account closure to pressure you',
          'Vague greeting "Dear Valued Customer" instead of your name',
          'No official PayPal branding or secure indicators',
          'Emotional manipulation to bypass your critical thinking',
        ],
      },
    },
  },
  {
    id: 3,
    type: 'example',
    title: 'Compare: Real vs. Fake Email',
    subtitle: 'Learn to distinguish legitimate emails from phishing attempts',
    content: {
      emailExample: {
        type: 'legit',
        from: 'PayPal',
        fromEmail: 'service@paypal.com',
        subject: 'Your PayPal account statement is ready',
        preview: 'Hi John, your monthly statement is available...',
        body: `Hi John Smith,

Your monthly account statement for June 2024 is now available in your account.

You can view your statement by logging in to your PayPal account at paypal.com.

If you have any questions, visit our Help Center or contact us at paypal.com/help.

Thanks,
PayPal`,
        greenFlags: [
          'Sender email is exactly "@paypal.com" — official domain',
          'Addresses you by your full name',
          'No urgency or threats — informational tone',
          'Directs you to visit the site manually, not via link',
          'Provides official support channels',
          'Professional, consistent formatting',
        ],
      },
    },
  },
  {
    id: 4,
    type: 'example',
    title: 'Spot the Fake Website',
    subtitle: 'Fake websites are designed to look identical to real ones',
    content: {
      websiteExample: {
        type: 'phishing',
        url: 'http://www.paypa1-secure-login.net/account/verify',
        title: 'PayPal — Log In',
        description: 'This fake website mimics PayPal\'s login page to steal your credentials.',
        redFlags: [
          'URL uses "paypa1" (number 1, not letter l) — subtle character swap',
          'Extra words "secure-login" added to appear trustworthy',
          'Uses HTTP instead of HTTPS — no SSL encryption',
          'Domain ends in ".net" not ".com" like the real PayPal',
          'Long, suspicious URL path "/account/verify"',
          'No padlock icon in browser address bar',
        ],
      },
    },
  },
  // ========== TACTICS & TIPS ==========
  {
    id: 5,
    type: 'tactics',
    title: 'Social Engineering Tactics',
    subtitle: 'How attackers manipulate human psychology',
    content: {
      tactics: [
        {
          name: 'Urgency & Fear',
          icon: '⏰',
          color: 'from-red-500 to-rose-600',
          description: 'Creating panic with fake deadlines or threats to force impulsive decisions.',
          example: '"Your account will be deleted in 2 hours! Act now!"',
        },
        {
          name: 'Authority',
          icon: '👔',
          color: 'from-blue-500 to-indigo-600',
          description: 'Impersonating bosses, IT departments, government agencies, or trusted organizations.',
          example: '"This is the IRS. You owe back taxes. Call immediately."',
        },
        {
          name: 'Curiosity & Greed',
          icon: '🎁',
          color: 'from-yellow-500 to-orange-500',
          description: 'Luring victims with fake prizes, rewards, or intriguing content.',
          example: '"You\'ve won a $1,000 Amazon gift card! Click to claim!"',
        },
        {
          name: 'Trust & Familiarity',
          icon: '🤝',
          color: 'from-green-500 to-emerald-600',
          description: 'Pretending to be a colleague, friend, or known brand to lower your guard.',
          example: '"Hi, it\'s Mike from IT. I need your password to fix an issue."',
        },
        {
          name: 'Reciprocity',
          icon: '💝',
          color: 'from-pink-500 to-purple-600',
          description: 'Offering something valuable first to create a sense of obligation to respond.',
          example: '"We\'ve already sent your package. Just confirm your address."',
        },
        {
          name: 'Social Proof',
          icon: '👥',
          color: 'from-cyan-500 to-teal-600',
          description: 'Claiming others have already done it to make the request seem normal.',
          example: '"1,000 employees already updated their credentials. Don\'t be left out."',
        },
      ],
    },
  },
  {
  id: 6,
  type: 'tips',
  title: 'Best Practices & Protection Tips',
  subtitle: 'Your action plan to stay safe online',
  content: {
    tips: [
      {
        icon: '🔍',
        title: 'Verify the Sender',
        description: 'Always check the full email address, not just the display name.',
        detail: '**Analogy:** A package arrives with a label saying “From: Amazon” but the return address is a PO box in China. **Example:** Display name “PayPal” but email address `security@paypa1.com` (with a number 1 instead of l). Always click on the “From” name to reveal the actual email address.',
        color: 'border-blue-400 bg-blue-950/30',
      },
      {
        icon: '🔗',
        title: 'Hover Before You Click',
        description: 'Hover your mouse over links to preview the actual URL before clicking.',
        detail: '**Analogy:** Reading the fine print before signing a contract. **Example:** The email says “Go to amazon.com” but hovering shows `http://amaz0n.secure-login.net` – the real destination is completely different. On mobile, press and hold the link to see the preview.',
        color: 'border-purple-400 bg-purple-950/30',
      },
      {
        icon: '🔐',
        title: 'Use Multi-Factor Authentication',
        description: 'Enable MFA on all accounts.',
        detail: '**Analogy:** A safe that needs both a key and a combination – one alone isn’t enough. **Example:** Even if a phisher steals your password, they cannot log in without the second factor (e.g., a code from your phone, a fingerprint, or a hardware key). Use authenticator apps (Google Authenticator, Authy) rather than SMS when possible.',
        color: 'border-green-400 bg-green-950/30',
      },
      {
        icon: '🔑',
        title: 'Use a Password Manager',
        description: 'Password managers auto-fill only on legitimate sites.',
        detail: '**Analogy:** A lock that only opens for your specific key – a fake key won’t turn. **Example:** You save `amazon.com` in your password manager. On a fake site `amaz0n.com`, the password manager will not auto‑fill, acting as a built‑in phishing detector. Recommended: Bitwarden, 1Password, Apple Keychain, or KeePass.',
        color: 'border-yellow-400 bg-yellow-950/30',
      },
      {
        icon: '📞',
        title: 'Verify Out-of-Band',
        description: 'Call using a number from official sources – not the email.',
        detail: '**Analogy:** If a stranger calls claiming to be your bank, you hang up and call the number on the back of your card. **Example:** An email from “your CEO” asks you to wire money. Instead of replying, call the CEO’s known office number (not the number in the email) to verify. Use a different communication channel.',
        color: 'border-orange-400 bg-orange-950/30',
      },
      {
        icon: '🚨',
        title: 'Report Suspicious Emails',
        description: 'Use the “Report Phishing” button in your email client.',
        detail: '**Analogy:** Telling a lifeguard when you see someone struggling – you help prevent a drowning. **Example:** Outlook, Gmail, and most corporate email systems have a “Report Phishing” button. Reporting trains spam filters and alerts your security team so others don’t receive the same attack.',
        color: 'border-red-400 bg-red-950/30',
      },
      {
        icon: '🔄',
        title: 'Keep Software Updated',
        description: 'Security patches fix vulnerabilities that phishing attacks exploit.',
        detail: '**Analogy:** Fixing a broken lock on your front door before a burglar notices. **Example:** Attackers often use known vulnerabilities in outdated browsers, Java, Flash, or PDF readers. Enable automatic updates on your OS, browser, and all applications. Patch within 48 hours of release.',
        color: 'border-cyan-400 bg-cyan-950/30',
      },
      {
        icon: '🧠',
        title: 'Think Before You Act',
        description: 'Slow down when pressure is applied.',
        detail: '**Analogy:** A magician uses distraction to fool you – pause and look closely. **Example:** Any email that says “Immediate action required” or “Your account will be closed” is trying to bypass your rational brain. Legitimate organizations never demand instant action via email. Take 10 seconds, breathe, and inspect the message.',
        color: 'border-pink-400 bg-pink-950/30',
      },
    ],
  },
},
  // ========== DEEP DIVE: PSYCHOLOGY ==========
  {
    id: 7,
    type: 'info',
    title: 'Why Phishing Works: The Psychology',
    subtitle: 'Understanding the cognitive biases attackers exploit',
    content: {
      body: 'Phishing succeeds because it targets human nature, not just technical vulnerabilities. Attackers craft messages that trigger automatic responses before rational thinking can intervene.',
      bullets: [
        { icon: '⚡', text: 'Urgency Bias', detail: 'We act quickly when told a deadline is near, bypassing careful scrutiny. **Analogy:** If someone yells “Fire!” in a crowded theater, you run for the exit without checking if it’s real. **Example:** “Your account will be permanently locked in 24 hours!” – the goal is to make you click before you think.' },
        { icon: '👔', text: 'Authority Bias', detail: 'We tend to obey requests from perceived authority figures without questioning. **Analogy:** A person in a police uniform tells you to step out of your car – you likely comply even if they show no badge. **Example:** An email from “IT Security” demanding your password for an urgent system update.' },
        { icon: '🎁', text: 'Curiosity Gap', detail: 'We want to resolve mysteries (e.g., “Your package could not be delivered”) and click impulsively. **Analogy:** A closed door with a sign “Do Not Enter” makes you want to peek inside. **Example:** Subject line “Someone tried to log into your account – click to see who.”' },
        { icon: '👥', text: 'Social Proof', detail: 'If others appear to have complied (e.g., “Your colleagues already updated”), we follow. **Analogy:** When you see a long line outside a restaurant, you assume the food must be good. **Example:** “Over 10,000 users have already verified their accounts – don’t be left behind.”' },
        { icon: '💸', text: 'Loss Aversion', detail: 'The fear of losing access to an account overrides caution about clicking a link. **Analogy:** People work harder to avoid losing $100 than to gain $100. **Example:** “Your email quota is full – you will not receive new messages until you upgrade immediately.”' },
        { icon: '🔄', text: 'Habit & Inattention', detail: 'We handle many emails automatically each day – phishing exploits that autopilot. **Analogy:** You drive the same route home every day and sometimes miss a new detour sign. **Example:** A fake “shared document” notification from a familiar service like Google Drive – you click without double‑checking the sender.' },
      ],
    },
  },
  // ========== DEEP DIVE: REAL COST ==========
  {
    id: 8,
    type: 'info',
    title: 'The Real Cost of Phishing Attacks',
    subtitle: 'Why organizations take this threat seriously',
    content: {
      body: 'Phishing is not just an annoyance – it leads to devastating financial, operational, and reputational damage. Below are real-world impacts and statistics.',
      bullets: [
        { icon: '💰', text: 'Financial Loss', detail: 'Average breach cost $4.91M (IBM, 2023). Ransomware often starts with a phishing email. **Analogy:** Leaving a single window unlocked can cost you everything inside the house. **Example:** In 2021, a phishing email gave attackers access to Colonial Pipeline’s network, leading to a $4.4M ransom payment and fuel shortages across the US East Coast.' },
        { icon: '📉', text: 'Business Downtime', detail: '60% of small companies close within 6 months of a major cyberattack. **Analogy:** A heart attack might not kill you instantly, but the recovery can put you out of work for months. **Example:** A dental practice gets hit with ransomware via email – they cannot access patient records or scheduling for two weeks, losing thousands in revenue and patient trust.' },
        { icon: '🔓', text: 'Data Breach', detail: '90% of data breaches begin with phishing. Credentials, customer data, and intellectual property are stolen. **Analogy:** A thief doesn’t need to break a window if you leave the key under the doormat. **Example:** The 2020 Twitter hack – employees were phished, giving attackers access to internal tools, leading to high‑profile account takeovers (Obama, Elon Musk).' },
        { icon: '⚖️', text: 'Regulatory Fines', detail: 'GDPR, HIPAA, and CCPA fines can reach millions for failure to protect data. **Analogy:** Speeding costs you a ticket; causing a crash costs you a lawsuit. **Example:** British Airways was fined £20M after a phishing attack leaked customer data – the fine could have been £183M under GDPR rules.' },
        { icon: '😟', text: 'Reputation Damage', detail: 'Customers lose trust after a breach; recovery takes years. **Analogy:** A restaurant with a health code violation loses regulars even after it’s cleaned up. **Example:** After the 2017 Equifax breach (which started with a phishing‑related vulnerability), the company’s brand still hasn’t fully recovered, and they lost billions in market value.' },
        { icon: '🕒', text: 'Remediation Time', detail: 'Average containment time for a phishing breach is 197 days. **Analogy:** Fighting a house fire takes much longer than preventing it. **Example:** Attackers often lurk inside networks for months, stealing data slowly – the 2020 SolarWinds breach took 9 months to detect and over a year to fully clean up.' },
      ],
    },
  },
  // ========== DEEP DIVE: RED FLAGS CHECKLIST ==========
  {
    id: 9,
    type: 'info',
    title: 'Phishing Red Flags – Detailed Checklist',
    subtitle: 'Memorize these warning signs to stay safe',
    content: {
      body: 'Use this mental checklist whenever you receive an unexpected message that asks for action.',
      bullets: [
        { icon: '📧', text: 'Sender address mismatch', detail: 'Display name may be "PayPal" but the actual email address is @gmail.com or a misspelled domain. **Analogy:** Someone wearing a police badge but their ID card says “Joe’s Pizza.” **Example:** “Microsoft” <security@rnicrosoft.com> (note “rn” instead of “m”).' },
        { icon: '⏰', text: 'Urgent or threatening language', detail: 'Phrases like “Immediate action required,” “Your account will be closed,” “Legal action pending.” **Analogy:** A pushy car salesman who says “This offer expires in 10 minutes!” – they want you to decide without thinking. **Example:** “Your PayPal account has been suspended due to illegal activity. Verify now to avoid arrest.”' },
        { icon: '🙋', text: 'Generic greetings', detail: '“Dear Customer,” “Dear User,” “Dear Sir/Madam” instead of your name. **Analogy:** A letter addressed to “Homeowner” instead of “Mr. Smith.” **Example:** Legitimate banks always use your full name. Phishing emails often skip this because they don’t have your real name.' },
        { icon: '🔗', text: 'Suspicious links', detail: 'Hover over the link (without clicking) to see the real URL. Look for misspellings, extra words, or unusual domains. **Analogy:** A sign that says “Free Pizza” but points to an alley – always check the destination. **Example:** The text says “amazon.com” but the hover URL is “amaz0n‑secure.net.”' },
        { icon: '📎', text: 'Unexpected attachments', detail: 'Especially .exe, .zip, .js, .vbs, or Office macros you did not request. **Analogy:** A stranger handing you a USB drive – would you plug it in? **Example:** “Invoice_2024.pdf.exe” – the double extension hides the dangerous .exe file.' },
        { icon: '✍️', text: 'Poor grammar/spelling', detail: 'Legitimate companies proofread their communications. Odd errors are a clue. **Analogy:** A counterfeit designer handbag with crooked stitching. **Example:** “We have detect unusual activity in you account. Please click to varify.”' },
        { icon: '🎁', text: 'Too good to be true', detail: 'Lotteries, free gift cards, inheritance offers – all classic lures. **Analogy:** A street magician offering to double your money – if it sounds too good, it’s a trick. **Example:** “You won a $1000 Amazon gift card! Click here to claim.”' },
        { icon: '🔒', text: 'Request for personal info', detail: 'Passwords, credit card numbers, MFA codes, or login credentials via email/text. **Analogy:** A stranger asking for the key to your house. **Example:** “Confirm your Social Security number for fraud protection” – real companies never ask for sensitive info by email.' },
      ],
    },
  },
  // ========== DEEP DIVE: INCIDENT RESPONSE ==========
  {
    id: 10,
    type: 'info',
    title: 'What To Do If You Suspect Phishing',
    subtitle: 'Your incident response plan',
    content: {
      body: 'Even with training, you might encounter a sophisticated phish. Follow these steps to protect yourself and your organization.',
      bullets: [
        { icon: '🚫', text: 'DO NOT click any links or open attachments', detail: 'Even if curious, do not interact with the message. **Analogy:** If you receive a suspicious package, you don’t open it to see if it’s a bomb. **Example:** A link in a phishing email could download ransomware the instant you click, even if you don’t enter any information.' },
        { icon: '📤', text: 'Report the message', detail: 'Use your email client’s “Report Phishing” button or forward to your IT security team. **Analogy:** Calling 911 when you see a fire – you help others stay safe too. **Example:** Reporting phishing trains your email filter to block similar messages for the entire company.' },
        { icon: '🗑️', text: 'Delete the message', detail: 'Remove it from your inbox and trash to avoid accidental clicks later. **Analogy:** Throwing away spoiled food – you don’t leave it in the fridge for someone else to eat. **Example:** Months later, you might search for an old email and accidentally click the phishing link.' },
        { icon: '🔐', text: 'If you clicked and entered info', detail: 'Change your password immediately from a clean device and enable MFA. Contact IT. **Analogy:** If you drop your house keys in a parking lot, you change the locks immediately. **Example:** Use a different computer (or your phone) to reset passwords – the compromised device may have malware that records your new password.' },
        { icon: '📞', text: 'Notify the impersonated organization', detail: 'Let the real company know about the phishing attempt – they may warn others. **Analogy:** Telling a store that someone is using their name to scam customers. **Example:** Forward the phishing email to reportphishing@apwg.org or to the company’s security team (e.g., phishing@paypal.com).' },
        { icon: '🛡️', text: 'Run antivirus scan', detail: 'If you clicked a link or opened an attachment, scan your device for malware. **Analogy:** After a break‑in, you check every room for hidden intruders. **Example:** Use Windows Defender, Malwarebytes, or your company’s approved antivirus to do a full system scan.' },
        { icon: '👥', text: 'Educate your team', detail: 'Share the phishing attempt with colleagues to raise awareness (without the malicious link). **Analogy:** If you see a pothole, you warn other drivers – don’t let them fall in. **Example:** Send a screenshot or describe the phishing email in a team chat, so others can recognize the same attack.' },
      ],
    },
  },
  // ========== QUIZ QUESTIONS 1-10 ==========
  {
    id: 11,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 1 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'You receive an email from "support@amaz0n-orders.com" saying your account is locked. What should you do?',
        options: [
          { text: 'Click the link in the email to unlock your account quickly', correct: false, explanation: '❌ Never click links from suspicious emails. The domain "amaz0n" (with a zero) is a typosquat of "amazon" — a classic phishing trick.' },
          { text: 'Delete the email and go directly to Amazon.com by typing it in your browser', correct: true, explanation: '✅ Correct! Always navigate directly to official websites by typing the URL yourself. This avoids fake links entirely.' },
          { text: 'Reply to the email asking for more information', correct: false, explanation: '❌ Replying confirms your email address is active to the attacker. Never engage with suspicious emails.' },
          { text: 'Forward the email to your friends to warn them', correct: false, explanation: '❌ Forwarding spreads the phishing link. Instead, report it to your IT/security team and delete it.' },
        ],
      },
    },
  },
  {
    id: 12,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 2 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'Your CEO sends you a WhatsApp message asking you to urgently buy $500 in gift cards for a client and send the codes. What is this?',
        scenario: 'The message came from an unknown number but says it\'s from your CEO who is "in a meeting and can\'t talk."',
        options: [
          { text: 'A legitimate business request — the CEO is busy', correct: false, explanation: '❌ This is a classic "CEO fraud" or Business Email Compromise (BEC) attack. Real executives don\'t ask for gift card payments via WhatsApp.' },
          { text: 'A whaling/CEO fraud attack — I should verify via official channels', correct: true, explanation: '✅ Correct! This is whaling (targeting employees using an executive\'s identity). Always verify unusual financial requests through official phone numbers.' },
          { text: 'It\'s fine since gift cards are small amounts', correct: false, explanation: '❌ Attackers often start with small amounts to test compliance. This is still fraud and you could be held responsible.' },
          { text: 'Reply asking for more details before proceeding', correct: false, explanation: '❌ Don\'t engage. Call your CEO\'s known, official phone number directly to verify the request.' },
        ],
      },
    },
  },
  {
    id: 13,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 3 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'Which URL is the legitimate bank website?',
        options: [
          { text: 'http://www.bankofamerica-secure.com/login', correct: false, explanation: '❌ The extra words "secure" and the ".com" after a hyphen indicate this is NOT the official site. Also uses HTTP, not HTTPS.' },
          { text: 'https://www.bankofamerica.com', correct: true, explanation: '✅ Correct! The official domain is exactly "bankofamerica.com" with HTTPS. No extra words, hyphens, or subdomains before the brand name.' },
          { text: 'https://bankofamerica.login-portal.net', correct: false, explanation: '❌ The actual domain here is "login-portal.net" — "bankofamerica" is just a subdomain. This is a phishing site.' },
          { text: 'https://secure-bankofamerica.com', correct: false, explanation: '❌ Adding "secure-" before the brand name is a common phishing trick. The real domain must be exactly "bankofamerica.com".' },
        ],
      },
    },
  },
  {
    id: 14,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 4 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'You get an email with an attachment called "Invoice_2024.pdf.exe". What should you do?',
        scenario: 'The email appears to come from a vendor you work with.',
        options: [
          { text: 'Open it — PDF files are always safe', correct: false, explanation: '❌ This is NOT a PDF! The real extension is ".exe" (executable program). The ".pdf" is part of the filename to trick you. Never open .exe attachments.' },
          { text: 'Save it first, then scan it with antivirus before opening', correct: false, explanation: '❌ Better, but still risky. The safest action is to not open it at all and verify with the sender via phone or a separate email.' },
          { text: 'Delete it and verify with the vendor via a known phone number', correct: true, explanation: '✅ Correct! Files ending in .exe are programs that can install malware. Contact the vendor directly through known channels to verify.' },
          { text: 'Forward it to IT and open it yourself too', correct: false, explanation: '❌ Good to report to IT, but never open the file yourself. Let security professionals handle potentially malicious files.' },
        ],
      },
    },
  },
  {
    id: 15,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 5 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'What does Multi-Factor Authentication (MFA) do to protect you from phishing?',
        options: [
          { text: 'It blocks all phishing emails automatically', correct: false, explanation: '❌ MFA does not block emails. It adds an extra verification step when logging in.' },
          { text: 'It requires a second form of verification (e.g., a code from your phone) even if your password is stolen', correct: true, explanation: '✅ Correct! Even if a phisher steals your password, they cannot log in without the second factor (biometric, SMS, authenticator app).' },
          { text: 'It encrypts your passwords so attackers can\'t read them', correct: false, explanation: '❌ While encryption helps, MFA specifically adds a second layer of identity verification.' },
          { text: 'It changes your password automatically every week', correct: false, explanation: '❌ That is password expiration, not MFA. MFA requires an additional factor at login.' },
        ],
      },
    },
  },
  {
    id: 16,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 6 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'You receive a text message (SMS) claiming to be from your bank, saying your account has been compromised and asking you to click a link to verify your identity. This is an example of:',
        options: [
          { text: 'Pharming', correct: false, explanation: '❌ Pharming redirects you to fake websites without your knowledge, usually via DNS poisoning.' },
          { text: 'Vishing', correct: false, explanation: '❌ Vishing is voice phishing (phone calls). This is SMS-based.' },
          { text: 'Smishing', correct: true, explanation: '✅ Correct! Smashing = SMS phishing. Attackers use text messages to trick you into clicking malicious links or sharing info.' },
          { text: 'Spear phishing', correct: false, explanation: '❌ Spear phishing is highly targeted email phishing, not SMS.' },
        ],
      },
    },
  },
  {
    id: 17,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 7 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'What should you do if you suspect you have clicked on a phishing link and entered your password?',
        options: [
          { text: 'Wait and see if anything bad happens', correct: false, explanation: '❌ Waiting gives attackers time to use your credentials. Act immediately.' },
          { text: 'Change your password immediately on that same computer', correct: false, explanation: '❌ If the computer might be compromised, changing the password on it could expose the new password. Use a clean, trusted device.' },
          { text: 'Change your password from a trusted device, enable MFA, and notify your security team', correct: true, explanation: '✅ Correct! Immediate action limits damage. Also scan for malware and monitor accounts for unauthorized activity.' },
          { text: 'Post about it on social media to warn friends', correct: false, explanation: '❌ While awareness is good, securing your accounts and notifying IT should come first.' },
        ],
      },
    },
  },
  {
    id: 18,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 8 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'Which of the following is a sign of a phishing email?',
        options: [
          { text: 'The email uses your full name and has no typos', correct: false, explanation: '❌ Legitimate emails often do that too. Phishing emails can be very sophisticated.' },
          { text: 'The sender\'s email address looks slightly different from the official domain (e.g., @paypa1.com instead of @paypal.com)', correct: true, explanation: '✅ Correct! Domain misspellings (typosquatting) are a major red flag. Always inspect the full email address, not just the display name.' },
          { text: 'The email contains a link to a website you recognize', correct: false, explanation: '❌ Attackers can mask links. Hover to see the real destination.' },
          { text: 'The email has an unsubscribe link at the bottom', correct: false, explanation: '❌ Many phishing emails also include fake unsubscribe links to appear legitimate.' },
        ],
      },
    },
  },
  {
    id: 19,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 9 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'What is a "watering hole" attack?',
        options: [
          { text: 'An attacker sends emails with water-related topics', correct: false, explanation: '❌ No, the name is metaphorical.' },
          { text: 'An attacker compromises a website frequently visited by a target group, then infects visitors with malware or phishing pages', correct: true, explanation: '✅ Correct! Instead of targeting individuals directly, attackers infect a trusted site their victims regularly use.' },
          { text: 'A type of phishing that uses fake job offers', correct: false, explanation: '❌ That would be job scam phishing, not a watering hole.' },
          { text: 'When attackers leave USB drives in a parking lot (watering hole = physical)', correct: false, explanation: '❌ That is a USB drop attack, not watering hole.' },
        ],
      },
    },
  },
  {
    id: 20,
    type: 'quiz',
    title: 'Quiz Time! 🧠',
    subtitle: 'Question 10 of 10 — Test your knowledge',
    content: {
      quiz: {
        question: 'Which of the following is the best way to verify a suspicious email request from a colleague?',
        options: [
          { text: 'Reply directly to the email asking if it is real', correct: false, explanation: '❌ The attacker might control the inbox and reply "Yes".' },
          { text: 'Call the colleague using a known, official phone number (not one from the email)', correct: true, explanation: '✅ Correct! Out-of-band verification (using a different communication channel) ensures you are talking to the real person.' },
          { text: 'Forward the email to another colleague for their opinion', correct: false, explanation: '❌ You might spread the phishing attempt. Instead, report it to IT.' },
          { text: 'Click the link but do not enter any information', correct: false, explanation: '❌ Clicking a phishing link can still download malware or track your IP address.' },
        ],
      },
    },
  },
  // ========== COMPLETION ==========
  {
    id: 21,
    type: 'completion',
    title: 'Training Complete! 🎉',
    subtitle: 'You\'re now better equipped to fight phishing attacks',
    content: {
      bullets: [
        { icon: '✅', text: 'What phishing is and its many forms' },
        { icon: '✅', text: 'How to spot phishing emails and fake websites' },
        { icon: '✅', text: 'Social engineering tactics attackers use' },
        { icon: '✅', text: 'Best practices to protect yourself' },
        { icon: '✅', text: 'Real-world scenarios and how to respond' },
      ],
    },
  },
];