-- DATA RESET SCRIPT
-- 1. Drop existing table to ensure clean slate (WARNING: Deletes existing packages)
DROP TABLE IF EXISTS health_packages;

-- 2. Create the table with ICON support
CREATE TABLE health_packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    price TEXT,
    features TEXT[],
    color TEXT DEFAULT '#7c4dff',
    icon TEXT, -- New field for Emojis/Icons
    popular BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active', -- 'active', 'coming_soon'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE health_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public packages are viewable by everyone" 
ON health_packages FOR SELECT USING (true);

CREATE POLICY "Admins can manage packages" 
ON health_packages FOR ALL USING (auth.role() = 'authenticated');

-- 4. Seed Data (Exact list provided)
INSERT INTO health_packages (title, subtitle, price, features, color, icon, popular, status) VALUES
(
    'Vital Wellness Package',
    'Adults 25+',
    '2,999',
    ARRAY['CBC', 'BP Monitoring', 'ECG', 'Blood Sugar', 'Lipid Profile', 'BMI Assessment'],
    '#FF6B6B',
    '💓',
    false,
    'active'
),
(
    'Metabolic Master Check',
    'Diabetes / Obesity / PCOD',
    '4,999',
    ARRAY['HbA1c', 'Insulin Levels', 'Thyroid Profile', 'Liver Function', 'Renal Function', 'Nutrition Consult'],
    '#4ECDC4',
    '🔬',
    true,
    'active'
),
(
    'Heart & Vascular Risk Panel',
    'Cardiac Risk Assessment',
    '5,999',
    ARRAY['ECG', 'Lipid Profile', 'CRP', 'Echo Referral', 'Cardiac Markers', 'Physician Consult'],
    '#FF4500',
    '❤️',
    false,
    'active'
),
(
    'Cancer Shield Screening',
    'Age 35+ or Family History',
    '6,999',
    ARRAY['Basic Tumor Markers', 'Ultrasound Abdomen', 'CBC', 'Oncology Consult', 'Risk Assessment'],
    '#6A0572',
    '🛡️',
    false,
    'active'
),
(
    'Senior Life & Longevity Package',
    'Age 50+',
    '7,999',
    ARRAY['Bone Health', 'Dementia Screening', 'Kidney Function', 'Diabetes Check', 'Vitamin Profile', 'Geriatric Consult'],
    '#FFD700',
    '🌟',
    false,
    'active'
),
(
    'Corporate Stress & Lifestyle Check',
    'Working Professionals',
    '3,999',
    ARRAY['BP Monitoring', 'Stress Evaluation', 'Sleep Assessment', 'Vitamin D', 'Basic Metabolic', 'Lifestyle Coaching'],
    '#2E86AB',
    '💼',
    false,
    'active'
),
(
    'Post-treatment Recovery Package',
    'Post-Surgery/Cancer',
    '8,999',
    ARRAY['Physician Consult', 'Physiotherapy Sessions', 'Nutrition Planning', 'Recovery Monitoring', 'Lab Tests'],
    '#A239CA',
    '🏥',
    false,
    'active'
);
