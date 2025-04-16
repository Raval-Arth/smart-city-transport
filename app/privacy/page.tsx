import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <div className="mr-4 hidden md:flex">
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
                                Home
                            </Link>
                            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                                Dashboard
                            </Link>
                            <Link href="/privacy" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                                Terms and Condition
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy & Terms</h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Our commitment to protecting your privacy and the terms governing the use of our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24">
                    <div className="container px-4 md:px-6">
                        <Tabs defaultValue="privacy" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                                <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="privacy" className="mt-6 space-y-6">
                                <div className="prose prose-blue max-w-none dark:prose-invert">
                                    <h2>Privacy Policy</h2>
                                    <p>
                                        <strong>Last Updated: April 16, 2025</strong>
                                    </p>
                                    <p>
                                        Smart City Transportation ("we," "our," or "us") is committed to protecting your privacy. This
                                        Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use
                                        our website and services.
                                    </p>

                                    <h3>Information We Collect</h3>
                                    <p>We may collect the following types of information:</p>
                                    <ul>
                                        <li>
                                            <strong>Personal Information:</strong> Name, email address, phone number, and other information
                                            you provide when creating an account or using our services.
                                        </li>
                                        <li>
                                            <strong>Location Data:</strong> With your permission, we collect precise location data to provide
                                            route optimization and traffic analysis services.
                                        </li>
                                        <li>
                                            <strong>Usage Information:</strong> Information about how you use our services, including routes
                                            taken, transportation modes selected, and interaction with our applications.
                                        </li>
                                        <li>
                                            <strong>Device Information:</strong> Information about your device, including IP address, device
                                            type, operating system, and browser type.
                                        </li>
                                    </ul>

                                    <h3>How We Use Your Information</h3>
                                    <p>We may use the information we collect for various purposes, including to:</p>
                                    <ul>
                                        <li>Provide, maintain, and improve our services</li>
                                        <li>Process and complete transactions</li>
                                        <li>Send you technical notices, updates, and administrative messages</li>
                                        <li>Respond to your comments, questions, and requests</li>
                                        <li>Provide customer service and support</li>
                                        <li>Communicate with you about products, services, offers, and events</li>
                                        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                                        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                                        <li>Personalize and improve your experience</li>
                                        <li>
                                            Aggregate and anonymize data for traffic analysis, route optimization, and urban planning purposes
                                        </li>
                                    </ul>

                                    <h3>Data Sharing and Disclosure</h3>
                                    <p>We may share your information in the following circumstances:</p>
                                    <ul>
                                        <li>
                                            <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                                            consultants, and other service providers who need access to such information to carry out work on
                                            our behalf.
                                        </li>
                                        <li>
                                            <strong>With City Partners:</strong> We may share aggregated, anonymized data with city
                                            transportation departments and urban planning agencies to improve traffic management and
                                            infrastructure.
                                        </li>
                                        <li>
                                            <strong>For Legal Reasons:</strong> We may disclose your information if we believe it is necessary
                                            to comply with applicable laws, regulations, legal processes, or governmental requests.
                                        </li>
                                        <li>
                                            <strong>Business Transfers:</strong> We may share or transfer your information in connection with
                                            a merger, acquisition, reorganization, sale of assets, or bankruptcy.
                                        </li>
                                        <li>
                                            <strong>With Your Consent:</strong> We may share your information with third parties when we have
                                            your consent to do so.
                                        </li>
                                    </ul>

                                    <h3>Data Security</h3>
                                    <p>
                                        We implement appropriate technical and organizational measures to protect the security of your
                                        personal information. However, please be aware that no method of transmission over the Internet or
                                        method of electronic storage is 100% secure.
                                    </p>

                                    <h3>Your Rights and Choices</h3>
                                    <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                                    <ul>
                                        <li>Access, correct, or delete your personal information</li>
                                        <li>Object to or restrict certain processing of your data</li>
                                        <li>Data portability</li>
                                        <li>Withdraw consent at any time for processing based on consent</li>
                                    </ul>
                                    <p>
                                        To exercise these rights, please contact us at{" "}
                                        <a href="mailto:privacy@smartcitytransport.com">privacy@smartcitytransport.com</a>.
                                    </p>

                                    <h3>Children's Privacy</h3>
                                    <p>
                                        Our services are not intended for children under 13 years of age. We do not knowingly collect
                                        personal information from children under 13.
                                    </p>

                                    <h3>Changes to This Privacy Policy</h3>
                                    <p>
                                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                                        new Privacy Policy on this page and updating the "Last Updated" date.
                                    </p>

                                    <h3>Contact Us</h3>
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us at{" "}
                                        <a href="mailto:privacy@smartcitytransport.com">privacy@smartcitytransport.com</a>.
                                    </p>
                                </div>
                            </TabsContent>
                            <TabsContent value="terms" className="mt-6 space-y-6">
                                <div className="prose prose-blue max-w-none dark:prose-invert">
                                    <h2>Terms and Conditions</h2>
                                    <p>
                                        <strong>Last Updated: April 16, 2025</strong>
                                    </p>
                                    <p>
                                        Please read these Terms and Conditions ("Terms") carefully before using the Smart City
                                        Transportation website and services.
                                    </p>

                                    <h3>1. Agreement to Terms</h3>
                                    <p>
                                        By accessing or using our services, you agree to be bound by these Terms. If you disagree with any
                                        part of the Terms, you may not access the service.
                                    </p>

                                    <h3>2. Description of Service</h3>
                                    <p>
                                        Smart City Transportation provides AI-powered transportation optimization services, including
                                        traffic analysis, route planning, and urban mobility solutions. Our services include web
                                        applications, mobile applications, and data analytics platforms designed for both individual
                                        commuters and city administrators.
                                    </p>

                                    <h3>3. User Accounts</h3>
                                    <p>
                                        When you create an account with us, you must provide accurate, complete, and current information.
                                        You are responsible for safeguarding the password and for all activities that occur under your
                                        account. You agree to notify us immediately of any unauthorized use of your account.
                                    </p>

                                    <h3>4. User Conduct</h3>
                                    <p>You agree not to:</p>
                                    <ul>
                                        <li>Use our services in any way that violates any applicable laws or regulations</li>
                                        <li>
                                            Impersonate any person or entity or falsely state or misrepresent your affiliation with a person
                                            or entity
                                        </li>
                                        <li>Interfere with or disrupt the services or servers or networks connected to the services</li>
                                        <li>
                                            Attempt to gain unauthorized access to any portion of the services or any other accounts, computer
                                            systems, or networks connected to the services
                                        </li>
                                        <li>Use any robot, spider, or other automatic device to access the services for any purpose</li>
                                        <li>
                                            Harvest or collect email addresses or other contact information of other users from the services
                                        </li>
                                    </ul>

                                    <h3>5. Intellectual Property</h3>
                                    <p>
                                        The service and its original content, features, and functionality are and will remain the exclusive
                                        property of Smart City Transportation and its licensors. The service is protected by copyright,
                                        trademark, and other laws. Our trademarks and trade dress may not be used in connection with any
                                        product or service without the prior written consent of Smart City Transportation.
                                    </p>

                                    <h3>6. User Content</h3>
                                    <p>
                                        You retain all rights to any content you submit, post, or display on or through the services. By
                                        submitting, posting, or displaying content on or through the services, you grant us a worldwide,
                                        non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create
                                        derivative works from, distribute, perform, and display such content in connection with providing
                                        and promoting our services.
                                    </p>

                                    <h3>7. Third-Party Links</h3>
                                    <p>
                                        Our service may contain links to third-party websites or services that are not owned or controlled
                                        by Smart City Transportation. We have no control over and assume no responsibility for the content,
                                        privacy policies, or practices of any third-party websites or services.
                                    </p>

                                    <h3>8. Termination</h3>
                                    <p>
                                        We may terminate or suspend your account immediately, without prior notice or liability, for any
                                        reason, including without limitation if you breach the Terms. Upon termination, your right to use
                                        the service will immediately cease.
                                    </p>

                                    <h3>9. Limitation of Liability</h3>
                                    <p>
                                        In no event shall Smart City Transportation, nor its directors, employees, partners, agents,
                                        suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or
                                        punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                                        intangible losses, resulting from your access to or use of or inability to access or use the
                                        service.
                                    </p>

                                    <h3>10. Disclaimer</h3>
                                    <p>
                                        Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS
                                        AVAILABLE" basis. The service is provided without warranties of any kind, whether express or
                                        implied, including, but not limited to, implied warranties of merchantability, fitness for a
                                        particular purpose, non-infringement, or course of performance.
                                    </p>

                                    <h3>11. Governing Law</h3>
                                    <p>
                                        These Terms shall be governed and construed in accordance with the laws of the United States,
                                        without regard to its conflict of law provisions.
                                    </p>

                                    <h3>12. Changes to Terms</h3>
                                    <p>
                                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                                        revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                                        effect.
                                    </p>

                                    <h3>13. Contact Us</h3>
                                    <p>
                                        If you have any questions about these Terms, please contact us at{" "}
                                        <a href="mailto:legal@smartcitytransport.com">legal@smartcitytransport.com</a>.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2025 Smart City Transportation. All rights reserved.
                    </p>
                    <nav className="flex items-center space-x-4 text-sm">
                        <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                            Terms & Conditions
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
