import React from "react";
import SectionHeader from "../ui/SectionHeader";
import NewsLetter from "../ui/NewsLetter";
import TermsAccordin from "../ui/TermsAccordin";
import safety from "../Assets/images/safety.png";
import refundable from "../Assets/images/refundable.png";
import support from "../Assets/images/support.png";
import trusted from "../Assets/images/trusted.png";

const Terms = () => {
  return (
    <>
      <SectionHeader />
      <section className="faqs">
        <div className="container">
          <div className="row cards-4 m-5">
            <div className="col-lg-6 col-12">
              <div className="p-3 d-flex cardd" data-aos="fade-up">
                <div className="icon">
                  <img src={safety} alt="icon" />
                </div>
                <div className="text">
                  <h6>ينجز يضمن حقك</h6>
                  <p>
                    يضمن خمسات لمشتري ومقدمي الخدمات حقوقهم عبر سياسات صارمة
                    تكفل السلامة والموثوقية لعمليات بيع وشراء الخدمات.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="p-3 d-flex cardd" data-aos="fade-up">
                <div className="icon">
                  <img src={refundable} alt="icon" />
                </div>
                <div className="text">
                  <h6>أموالك قابلة للاسترداد</h6>
                  <p>
                    يمكنك إسترداد مبلغ الخدمة دائما إن لم تنفذ بالكامل وفقاً لما
                    يعرضه البائع في وصف الخدمة.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="p-3 d-flex cardd" data-aos="fade-up">
                <div className="icon">
                  <img src={support} alt="icon" />
                </div>
                <div className="text">
                  <h6>دعم فني على مدار 24 ساعة</h6>
                  <p>
                    نحن هنا لمساعدتك في حل أي مشكلة قد تواجهك وللإجابة عن أي
                    استفسار، بفريق دعم فني متواجد ومتعاون على مدار 24 ساعة وطوال
                    أيام الأسبوع.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="p-3 d-flex cardd" data-aos="fade-up">
                <div className="icon">
                  <img src={trusted} alt="icon" />
                </div>
                <div className="text">
                  <h6>هويات موثقة</h6>
                  <p>
                    يضم خمسات آلاف البائعين الذين وثقوا هوياتهم عبر نظام توثيق
                    هوية الحساب. ضماناً لتعاملات أكثر أماناً وجدية.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up">
            <TermsAccordin />
          </div>
        </div>
      </section>

      <div className="Newsletter p-2">
        <NewsLetter />
      </div>
    </>
  );
};

export default Terms;
