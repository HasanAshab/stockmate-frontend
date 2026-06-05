const Reports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">View comprehensive system reports.</p>
      </div>
      <div className="bg-card border border-border/60 rounded-2xl p-16 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Reports Module</h2>
        <p className="text-muted-foreground max-w-md mx-auto">The full reports module (Stock Summary, Low Stock, Stock Movement) is currently under development and will be available in the next release.</p>
      </div>
    </div>
  );
};

export default Reports;
