import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

export default function Audit() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <FloatingNav />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4">FREE AUDIT</p>
          <h1 className="font-syne text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Get a custom AI Automation Audit for your business in 5 minutes
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mb-12">
            We map your team's manual processes to AI agents and show you exactly what to automate first. No call required.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'What it covers', body: "Your departments, processes, hours, cost drivers, AI readiness." },
              { title: 'What you get back', body: "A personalized hosted report with industry benchmarks, 30-60-90 roadmap, and your custom Cortex configuration." },
              { title: 'Who it is for', body: "B2B service businesses doing $20K/month or more, losing leads to manual processes." },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 backdrop-blur-sm p-6"
                style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)' }}
              >
                <h3 className="font-syne font-semibold text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <a
            href="https://sumait-audit.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-full transition-all shadow-[0_0_40px_8px_rgba(239,68,68,0.35)]"
          >
            Start your audit →
          </a>

          <div className="mt-20">
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-8">FAQ</h2>
            <div className="space-y-6 max-w-3xl">
              <div>
                <p className="font-semibold mb-2">How long does it take?</p>
                <p className="text-white/60">About 5 minutes to fill out the wizard. Report generates in 30 seconds.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Do I need to talk to a human?</p>
                <p className="text-white/60">No. The whole audit is self-serve. You get a hosted report URL you can share with your team. Optional: book a call after.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">What do you do with my data?</p>
                <p className="text-white/60">We store your inputs to generate your report. Bryan reviews them to inform follow-up. We do not share with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
