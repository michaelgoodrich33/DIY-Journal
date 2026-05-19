'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

export default function JournalBuilder() {
  const [duration, setDuration] = useState(7);
  const [quote, setQuote] = useState('');
  const [options, setOptions] = useState({
    gratitudeNvc: true,
    todoList: true,
    artTherapy: true,
    personalConnection: true,
  });

  const toggleOption = (key: string) => {
    setOptions((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // --- 1. COVER PAGE ---
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235); // Blue Accent
    doc.text("Daily Journal", 105, 80, { align: "center" });
    
    if (quote) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100);
      doc.text(`"${quote}"`, 105, 100, { align: "center", maxWidth: 160 });
    }

    // --- 2. THE PAGE LOOP ---
    for (let i = 1; i <= duration; i++) {
      doc.addPage();
      let yPos = 20;

      // Header: Day and Date
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(`Day ${i}`, 20, yPos);
      doc.text("Date: ____ / ____ / ____", 130, yPos);
      doc.line(20, yPos + 2, 190, yPos + 2);
      yPos += 12;

      // Dynamic North Star Quote at the top of every day page
      if (quote) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.setTextColor(60); 
        doc.text(`"${quote}"`, 105, yPos + 2, { align: "center", maxWidth: 160 });
        yPos += 15;
      } else {
        yPos += 5; 
      }

      // Gratitude / NVC Section
      if (options.gratitudeNvc) {
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("I am grateful for;", 20, yPos);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        for (let g = 1; g <= 6; g++) {
          doc.text(`${g}. ________________________________________________`, 25, yPos + 2 + (g * 7));
        }
        yPos += 52;

        doc.setFont("helvetica", "bold");
        doc.text("What would make today great?", 20, yPos);
        doc.line(20, yPos + 10, 190, yPos + 10);
        yPos += 22;

        doc.text("Amazing things that happened today", 20, yPos);
        for (let a = 1; a <= 3; a++) {
          doc.text(`${a}. ________________________________________________`, 25, yPos + 2 + (a * 7));
        }
        yPos += 32;

        doc.text("Something I could do differently next time.", 20, yPos);
        doc.line(20, yPos + 10, 190, yPos + 10);
        yPos += 25;

        doc.text("Something I or others did today to make life wonderful", 20, yPos);
        doc.setFont("helvetica", "normal");
        doc.text("What:", 20, yPos + 8); doc.line(35, yPos + 9, 190, yPos + 9);
        
        doc.text("I felt:", 20, yPos + 17); doc.line(35, yPos + 18, 100, yPos + 18);
        doc.text("They Felt:", 110, yPos + 17); doc.line(130, yPos + 18, 190, yPos + 18);
        
        doc.setFont("helvetica", "bold");
        doc.text("The need being met was;", 20, yPos + 28);
        doc.setFont("helvetica", "normal");
        doc.text("Theirs: ________________________", 25, yPos + 36);
        doc.text("Mine: _________________________", 110, yPos + 36);
        yPos += 48;
      }

      // --- PAGE 2 FOR THE DAY (CONTINUED) ---
      doc.addPage(); 
      yPos = 20; 
      doc.setFont("helvetica", "bold");
      doc.text(`Day ${i} (continued)`, 20, yPos);
      doc.line(20, yPos + 2, 190, yPos + 2);
      yPos += 15;

      // To-Do List
      if (options.todoList) {
        doc.setFont("helvetica", "bold");
        doc.text("To do List / Connect with today's Person", 20, yPos);
        doc.setFont("helvetica", "normal");
        doc.text("Three important things I choose to do today are;", 20, yPos + 8);
        for (let t = 1; t <= 3; t++) {
          doc.text(`${t}. ________________________________________________`, 25, yPos + 12 + (t * 7));
        }
        yPos += 50;
      }

      // Art Therapy (1/3 of page blank, no boxes)
      if (options.artTherapy) {
        doc.setFont("helvetica", "bold");
        doc.text("Art Therapy", 20, yPos);
        doc.setFont("helvetica", "normal");
        doc.text("Drawing to express something I or others did today to make life wonderful", 20, yPos + 7);
        yPos += 85; 
      }

      // Personal Connection (Heading only, pure white space below)
      if (options.personalConnection) {
        doc.setFont("helvetica", "bold");
        doc.text("What’s on Top. Any thoughts or feelings I have", 20, yPos);
      }

      // Booklet Page Numbering
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Day ${i} - Page ${doc.internal.getNumberOfPages()}`, 105, 285, { align: "center" });
    }

    doc.save(`DIY-Journal-${duration}-Days.pdf`);
  };

  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">DIY Journal Builder</h1>
          <p className="text-slate-500 mt-2">Customized Gratitude & NVC Booklet Tool</p>
        </header>

        <div className="space-y-6">
          {/* Duration Selector */}
          <div>
            <label className="block text-sm font-bold mb-2">Booklet Duration</label>
            <div className="flex gap-2">
              {[7, 14, 21, 30].map(d => (
                <button key={d} onClick={() => setDuration(d)} className={`flex-1 py-2 rounded-lg border transition ${duration === d ? 'bg-blue-600 text-white font-bold' : 'bg-white hover:bg-slate-50'}`}>{d} Days</button>
              ))}
            </div>
          </div>

          {/* Module Selector */}
          <div className="grid grid-cols-1 gap-2">
            <label className="block text-sm font-bold mb-1">Active Booklet Modules</label>
            {Object.keys(options).map((key) => (
              <button 
                key={key} 
                onClick={() => toggleOption(key)}
                className={`text-left p-3 rounded-lg border-2 transition capitalize ${options[key as keyof typeof options] ? 'border-blue-600 bg-blue-50 font-medium' : 'border-slate-100 text-slate-400'}`}
              >
                {key.replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          {/* Quote Input */}
          <div>
            <label className="block text-sm font-bold mb-2">Personal North Star Quote</label>
            <textarea 
              className="w-full p-3 border rounded-lg h-20 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition" 
              value={quote} 
              onChange={(e) => setQuote(e.target.value)}
              placeholder="e.g., Connection before Content"
            />
          </div>

          {/* PDF Trigger Button */}
          <button onClick={generatePDF} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-md">
            Generate Document
          </button>
        </div>
      </div>
    </main>
  );
}