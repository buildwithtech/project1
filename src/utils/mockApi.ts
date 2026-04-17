// Simulated API responses based on the provided JSON schemas

export const simulateTriage = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isEmergency = data.symptoms.toLowerCase().includes('chest pain') && 
                          data.symptoms.toLowerCase().includes('breathless');
      
      resolve({
        triage: isEmergency ? "emergency" : "urgent",
        triageReason: isEmergency 
          ? "Chest pain combined with breathlessness indicates a high risk of a critical cardiac event."
          : "Symptoms require prompt medical evaluation to rule out severe infection or complications.",
        topDiagnoses: isEmergency ? [
          { name: "Myocardial Infarction (Heart Attack)", probability: 75 },
          { name: "Pulmonary Embolism", probability: 15 },
          { name: "Severe Angina", probability: 10 }
        ] : [
          { name: "Acute Respiratory Infection", probability: 60 },
          { name: "Viral Fever", probability: 30 },
          { name: "Gastroenteritis", probability: 10 }
        ],
        immediateAction: isEmergency 
          ? "Do not wait. Take the patient to the nearest hospital emergency room immediately. Keep them seated and calm."
          : "Visit the nearest primary health center (PHC) today for a checkup.",
        redFlags: isEmergency 
          ? ["Loss of consciousness", "Pain spreading to left arm or jaw", "Profuse sweating"]
          : ["High fever not going down", "Inability to drink fluids", "Severe weakness"],
        ayushmanNote: "Emergency treatments and hospitalizations are covered up to ₹5 Lakhs under PM-JAY. Please carry the Ayushman card."
      });
    }, 1500);
  });
};

export const simulateSummarizer = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        patientSnapshot: `Patient is a ${data.age}-year-old with a history of chronic conditions, currently presenting for follow-up. General health appears stable but requires monitoring.`,
        criticalAlerts: data.allergies ? data.allergies.split(',').map((a: string) => `${a.trim()} Allergy`) : ["No known severe allergies"],
        chronicConditions: ["Hypertension Type II", "Type 2 Diabetes Mellitus"],
        currentMedications: ["Amlodipine 5mg daily", "Metformin 500mg twice daily"],
        lastVisitSummary: "Visited clinic 3 months ago for routine check; blood sugar was slightly elevated.",
        recommendedTests: ["HbA1c", "Lipid Profile", "Renal Function Test"],
        doctorNote: "Monitor blood pressure closely today. Consider adjusting Metformin dosage if HbA1c remains > 7.5%."
      });
    }, 1500);
  });
};

export const simulatePharmacy = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        medicines: [
          {
            brandName: "Augmentin 625 Duo",
            genericName: "Amoxicillin + Clavulanic Acid",
            dosage: "1 tablet twice a day after meals",
            duration: "5 days",
            janAushadhiAvailable: true,
            estimatedCost: "200",
            genericAlternative: "Amoxyclav 625 (Jan Aushadhi)"
          },
          {
            brandName: "Calpol 500",
            genericName: "Paracetamol 500mg",
            dosage: "1 tablet when fever > 100°F",
            duration: "3 days",
            janAushadhiAvailable: true,
            estimatedCost: "30",
            genericAlternative: "Paracetamol 500mg (Jan Aushadhi)"
          }
        ],
        totalEstimatedCost: "230",
        janAushadhiSavings: "160",
        urgentMedicines: ["Augmentin 625 Duo"],
        storageNote: "Keep medicines in a cool, dry place away from direct sunlight. No refrigeration needed."
      });
    }, 1500);
  });
};
