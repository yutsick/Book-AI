import React from 'react'

function page() {
  return (
    <section className="bg-pink mt-4">
      <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
        <h1 className="text-[32px] md:text-[44px] text-center font-bold mb-2">California Privacy Notice</h1>
        <p className="text-gray-600 text-center mb-[35px]">Last Updated: February 17, 2025</p>

        <div className="text-[16px] space-y-[30px]">
          <div className="">
            This California Privacy Notice (&quot;Notice&quot;) supplements the information contained in our Privacy Policy and applies solely to residents of the State of California (&quot;consumers&quot; or &quot;you&quot;). This Notice is provided to comply with the California Consumer Privacy Act of 2018 (&quot;CCPA&quot;) and the California Privacy Rights Act (&quot;CPRA&quot;). Any terms defined in the CCPA/CPRA have the same meaning when used in this Notice.

          </div>
          <div>
            <h2 className="text-[20px] font-bold mb-2">1. Information Collection and Use</h2>
            <h3 className=" font-bold mb-1">1.1 Categories of Personal Information</h3>

            <div className="overflow-x-auto">
              <div className="mb-2">
                Book Tailor, Inc. ("Book Tailor") and its Parent Company (collectively, "we," "our," or "us") have collected the following categories of personal information within the last twelve (12) months:
              </div>
              <table className="min-w-full  text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border-r sticky left-0 bg-gray-100">Category</th>
                    <th className="p-2 border-r">Examples</th>
                    <th className="p-2">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { category: "Identifiers", examples: "Name, email address, postal address, IP address, account name", collected: "YES" },
                    { category: "Personal information categories listed in the California Customer Records statute", examples: "Name, address, telephone number, payment information", collected: "YES" },
                    { category: "Protected classification characteristics under California or federal law", examples: "Age, gender", collected: "YES" },
                    { category: "Commercial information", examples: "Products or services purchased, purchasing histories", collected: "YES" },
                    { category: "Internet or other similar network activity", examples: "Browsing history, search history, interaction with website", collected: "YES" },
                    { category: "Geolocation data", examples: "Physical location", collected: "YES" },
                    { category: "Sensory Data", examples: "Audio, electronic, visual information", collected: "NO" },
                    { category: "Professional or employment-related information", examples: "Current or past job history", collected: "NO" },
                    { category: "Non-public education information", examples: "Education records", collected: "NO" },
                    { category: "Inferences drawn from other personal information", examples: "Profile reflecting preferences, characteristics, behaviors", collected: "YES" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b ">
                      <td className="p-2 border-r  sticky left-0 ">{row.category}</td>
                      <td className="p-2 border-r">{row.examples}</td>
                      <td className="p-2">{row.collected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className=" font-bold mb-1">1.2 Sources of Personal Information</h3>
            <div className="mb-2">We obtain the categories of personal information listed above from:</div>
            <ul className="ml-[25px] list-disc leading-[23px]">
              <li className="mb-2">Direct interactions with consumers</li>
              <li className="mb-2">Automated technologies or interactions</li>
              <li className="mb-2">Third-party service providers</li>
              <li className="mb-2">Advertising and analytics providers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] font-bold mb-2">2. Use and Disclosure of Personal Information</h2>
            <h3 className=" font-bold mb-1">2.1 Business or Commercial Purposes</h3>
            <div>
              Both Book Tailor and its Parent Company may use or disclose personal information for:

            </div>


            <ul className="ml-[25px] list-disc leading-[23px]">
              <li className="mb-2">Providing and maintaining our Service</li>
              <li className="mb-2">Processing payments and transactions</li>
              <li className="mb-2">Marketing and advertising through various platforms</li>
              <li className="mb-2">Analytics and Service improvement</li>
              <li className="mb-2">Security and fraud prevention</li>
              <li className="mb-2">Legal compliance</li>
              <li className="mb-2">Communication with users</li>
            </ul>
          </div>

          <div>
            <h3 className=" font-bold mb-1">2.2 Sharing Personal Information</h3>
            <p>We share personal information with:</p>

            <ul className="ml-[25px] list-disc leading-[23px]">
              <li className="mb-2">Service providers and processors</li>
              <li className="mb-2">Advertising platforms (including but not limited to Facebook, TikTok, Snapchat, and other advertising platforms)</li>
              <li className="mb-2">Analytics providers</li>
              <li className="mb-2">Marketing partners</li>
              <li className="mb-2">Payment processors</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] font-bold mb-2">3. Sales and Sharing of Personal Information</h2>
            <h3 className=" font-bold mb-1">3.1 Sale of Personal Information</h3>
            <p className='mb-7'>We do not sell personal information in the traditional sense. However, some sharing of information with third-party advertising partners may constitute a &quot;sale&quot; under CCPA/CPRA.</p>
            <h3 className=" font-bold mb-1">3.2 Sharing for Cross-Context Behavioral Advertising</h3>
            <p>We share personal information with advertising partners for cross-context behavioral advertising purposes.</p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold mb-2">4. California Privacy Rights</h2>
            <h3 className=" font-bold mb-1">4.1 Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="ml-[25px] list-disc mb-7 leading-[23px]">
              <li className="mb-2">Know what personal information we collect and how it is used</li>
              <li className="mb-2">Delete your personal information</li>
              <li className="mb-2">Correct inaccurate personal information</li>
              <li className="mb-2">Limit use and disclosure of sensitive personal information</li>
              <li className="mb-2">Opt-out of the sale or sharing of personal information</li>
              <li className="mb-2">Non-discrimination for exercising your rights</li>
            </ul>

            <h3 className=" font-bold mb-1">4.2 Exercising Your Rights</h3>
            <p>To exercise your rights, please email us at <a className="text-blue-500" href="mailto:privacy@booktailor.com">privacy@booktailor.com</a>. We will verify your request using:</p>
            <ul className="ml-[25px] list-disc leading-[23px] mb-7">
              <li className="mb-2">Email address</li>
              <li className="mb-2">Order history</li>
              <li className="mb-2">Account information</li>
            </ul>

            <h3 className=" font-bold mb-1">4.3 Response Timing</h3>
            <p>We will respond to verifiable consumer requests within 45 days. If we require additional time, we will inform you in writing.</p>
          </div>
          <div>
            <h2 className="text-[20px] font-bold mb-2">5. Notice of Financial Incentive</h2>
            <p>If we offer any financial incentives permitted by CCPA/CPRA, we will provide notice and obtain consent as required by law.</p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold mb-2">6. Changes to This Notice</h2>
            <p>We reserve the right to amend this Notice at our discretion and at any time. Changes will be communicated through our Service or via email.</p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold mb-2">7. Contact Information</h2>
            <p>
              For privacy-related matters: <a href="mailto:privacy@booktailor.com" className="font-bold">privacy@booktailor.com</a><br />
            </p>
            <p>
              For general support and questions: <a href="mailto:hi@booktailor.com" className="font-bold">hi@booktailor.com</a>
            </p>

            <div className="mb-2">
              <p className="mt-2">Physical Address: <br />
                Book Tailor, Inc. <br />
                1111B S Governors Ave STE 26192 <br />
                Dover, Delaware 19904</p>
            </div>

          </div>

          <div>
            <h2 className="text-[20px] font-bold mb-2">8. Last Updated</h2>
            <p>This Notice was last updated on February 17, 2025.</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default page
