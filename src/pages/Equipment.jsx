import { useState } from 'react';
import { motion } from 'framer-motion';


export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState('laboratory');

  const equipmentData = {
    laboratory: {
      title: 'Laboratory Equipment',
      items: [
        {
          name: 'Nano Lab 200',
          type: 'Fully Automated Clinical Chemistry Analyser',
          features: [
            'Automatic calibration and test combination',
            'Effective time management of reagents and serum',
            'Whole process detection with linear expansion of enzyme',
            'Blank deduction and dirty cuvette memory',
            'Cross infection prevention',
            'Patient information memory and association input',
            'Automatic report audit and data fuzzy query',
            'Report statistics and printing',
            'Reference range grading',
            'Alarm information classification',
            'User operation privilege classification management'
          ]
        },
        {
          name: 'BIOSYSTEMS BTS Semi-Automatic Analyzer',
          type: 'New Generation Clinical Analyzer',
          features: [
            'Optical LED Technology (340-670 nm) for highest precision',
            'Accurate and reliable results with BioSystems reagents',
            'User-friendly and intuitive software interface',
            '7" Color touchscreen for rapid access to all menus',
            'Comprehensive Test Panel for IVD',
            'High quality Quartz flow cuvette (18 μL)',
            'Full-fledged operating system – high database capacity (5GB)',
            'Ergonomic and modern design',
            'Full connectivity to PC (LIS) and smart devices'
          ]
        },
        {
          name: 'Sensa Cores ST-200aQua Electrolyte Analyzer',
          type: 'Automated Electrolyte System',
          features: [
            'Microprocessor-controlled with current ISE technology',
            'Measures Sodium, Potassium, Calcium, Lithium, pH, Chloride',
            'Tests whole blood, plasma, serum, CSF, and urine',
            'Diagnosis and monitoring of electrolyte imbalance',
            'Designed for small to medium-size laboratories',
            'Latest ISE technology implementation'
          ]
        },
        {
          name: 'Mispa-i2',
          type: 'Semi-Automated Specific Protein Analyzer',
          features: [
            'High precision and quick turnaround results',
            'All protein assays in blood testing',
            'Clinical management of Diabetes, Cardiovascular risk, Inflammation',
            'Patented Unique Channel Shifting (UCS) technology',
            'Best sensitivity and high linearity',
            'Quality results assurance'
          ]
        },
        {
          name: 'Cellenium 5D Retic',
          type: '5 Part Differential Hematology Analyser',
          features: [
            'Easy to use with best in class technology',
            '60 samples/hour throughput',
            'Large touch screen display',
            'In-built thermal printer facility',
            '34 parameters including RET%, RET# and research parameters',
            'Double WBC counting mode for accurate differential count',
            'Laser light multi-dimensional classification',
            'Resistant RBC Mode'
          ]
        },
        {
          name: 'BC-3000Plus Mindray',
          type: 'Mainstream Laboratory Analyzer',
          features: [
            'Prioritizes quality results',
            'Large color LCD Display',
            'Built-in thermal printer',
            'Huge storage capacity',
            'User-friendly interface',
            'Convenience and accuracy combined'
          ]
        },
        {
          name: 'Siemens CLINITEK Status+ Urine Analyzer',
          type: 'Automated Urinalysis System',
          features: [
            'AI-aided analysis',
            'Automated reading of Multistix® tests',
            'Tests: Leukocyte, Nitrite, Protein, Blood, Glucose',
            'Ketone, Bilirubin, Urobilinogen, pH',
            'Specific Gravity, Creatinine',
            'Protein-to-Creatinine Ratio',
            'Albumin and Albumin-to-Creatinine Ratio (ACR)',
            'CLINITEST® hCG Pregnancy Test'
          ]
        }
      ]
    },
    cardiology: {
      title: 'Cardiology Equipment',
      items: [
        {
          name: 'Tricog InstaECG™',
          type: 'AI-Powered Digital ECG Solution',
          workflow: [
            {
              step: 'Step 01',
              description: 'ECG is taken at the remote centre using the Tricog 12-Lead ECG machine'
            },
            {
              step: 'Step 02',
              description: 'The ECG data is transmitted to the Tricog Cloud, where the preliminary diagnosis takes place by the AI Engine'
            },
            {
              step: 'Step 03',
              description: 'A team of cardiac specialists at Tricog\'s 24×7 medical hub verifies the diagnosis and generates a final report'
            },
            {
              step: 'Step 04',
              description: 'Accurate ECG report is sent via Mobile App and Email within minutes'
            }
          ],
          features: [
            'Specialist verified 12 lead ECG interpretation',
            'AI and human expertise combined',
            'Instant, accurate, and consistent interpretations',
            'Increases chances of surviving heart attack',
            'Tricog Communicator - IoT device interface',
            'Compatible with more than 12 brands',
            'GSM or Wifi module for data transmission',
            'Atlas ECG Analysis Terminal - web and mobile based'
          ]
        },
        {
          name: 'Treadmill Stress Test',
          type: 'Cardiovascular Stress Testing',
          features: [
            'Electrocardiography monitoring',
            'Blood pressure monitoring during exercise',
            'Treadmill or bicycle protocols',
            'Comprehensive cardiovascular assessment'
          ]
        },
        {
          name: '2D Echo (Echocardiography)',
          type: 'Ultrasound Heart Imaging',
          features: [
            'Sophisticated imaging technique',
            'Detailed visualizations of heart structure and function',
            'Moving images on computer screen',
            'Non-invasive procedure',
            'Real-time examination of chambers, valves, blood vessels',
            'Cornerstone in cardiology for diagnosing heart diseases',
            'Also known as heart sonogram or heart ultrasound'
          ]
        }
      ]
    },
    radiology: {
      title: 'Radiology Equipment',
      items: [
        {
          name: 'Philips Ultrasound System',
          type: 'Advanced Imaging System',
          features: [
            'Next Gen AutoSCAN - improves image uniformity',
            'Adaptive brightness adjustment at every pixel',
            'Reduces button pushes by up to 54%',
            'Pixel-by-pixel real-time optimization',
            'Flow Viewer - 3D-like rendering of flow imaging',
            'Enhanced vascular and fetal heart architecture visualization',
            'MicroFlow Imaging (MFI) - detects slow and weak blood flow',
            'High resolution with minimal artifacts',
            'Available in all color imaging modes (CFM, CPA, CPAd, MFI HD)'
          ]
        },
        {
          name: 'Digital X-Ray',
          type: 'High-Definition Digital Radiography',
          features: [
            'Very high quality images with fine detail',
            'Real-time enhancement capability',
            'Immediate results available for review',
            'Lower radiation doses than traditional X-rays',
            'Instant report transmission to printer',
            'No cassette needed - fully digital',
            'Quick and easy access at click of mouse',
            'Efficient filing and retrieval'
          ]
        },
        {
          name: 'Digital OPG (Orthopantomogram)',
          type: 'Panoramic Dental X-Ray',
          features: [
            'Panoramic wide view of lower face',
            'Displays all teeth of upper and lower jaw',
            'Shows number, position and growth of teeth',
            'Includes teeth not yet surfaced or erupted',
            'Three-dimensional view from ear to ear',
            'Comprehensive dental and jaw assessment'
          ]
        }
      ]
    },
    pulmonology: {
      title: 'Pulmonology Equipment',
      items: [
        {
          name: 'Pulmonary Function Test (PFT) System',
          type: 'Comprehensive Lung Function Testing',
          tests: [
            {
              name: 'Spirometry',
              description: 'Measures how much air you can inhale and exhale. Estimates total air capacity in lungs.'
            },
            {
              name: 'Lung Volumes / Body Plethysmography',
              description: 'Measures various amounts of air in lungs after different points of inhalation and exhalation.'
            },
            {
              name: 'Gas Diffusion Study',
              description: 'Measures how much oxygen and other gases transfer from lungs to blood.'
            },
            {
              name: 'Cardiopulmonary Exercise Test (CPET)',
              description: 'Measures how well heart, lungs and muscles work during exercise.'
            }
          ]
        }
      ]
    }
  };

  const currentData = equipmentData[activeCategory];

  return (
    <div className="equipment-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Our Advanced Equipment</h1>
            <p>At Aarunya Health Care, founded by Mr. Vaishnav, we utilize state-of-the-art medical technology for accurate diagnosis and treatment</p>
          </motion.div>
        </div>
      </section>

      <section className="equipment-content">
        <div className="container">
          <div className="equipment-tabs">
            <button
              className={activeCategory === 'laboratory' ? 'tab active' : 'tab'}
              onClick={() => setActiveCategory('laboratory')}
            >
              Laboratory
            </button>
            <button
              className={activeCategory === 'cardiology' ? 'tab active' : 'tab'}
              onClick={() => setActiveCategory('cardiology')}
            >
              Cardiology
            </button>
            <button
              className={activeCategory === 'radiology' ? 'tab active' : 'tab'}
              onClick={() => setActiveCategory('radiology')}
            >
              Radiology
            </button>
            <button
              className={activeCategory === 'pulmonology' ? 'tab active' : 'tab'}
              onClick={() => setActiveCategory('pulmonology')}
            >
              Pulmonology
            </button>
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="equipment-section"
          >
            <h2>{currentData.title}</h2>

            {currentData.items.map((item, index) => (
              <motion.div
                key={index}
                className="equipment-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{item.name}</h3>
                <p className="equipment-type">{item.type}</p>

                {item.workflow && (
                  <div className="workflow-section">
                    <h4>How it works:</h4>
                    <div className="workflow-steps">
                      {item.workflow.map((step, idx) => (
                        <div key={idx} className="workflow-step">
                          <div className="step-number">{step.step}</div>
                          <p>{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.features && (
                  <div className="features-section">
                    <h4>Key Features:</h4>
                    <ul className="features-list">
                      {item.features.map((feature, idx) => (
                        <li key={idx}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.tests && (
                  <div className="tests-section">
                    <h4>Available Tests:</h4>
                    {item.tests.map((test, idx) => (
                      <div key={idx} className="test-item">
                        <h5>{test.name}</h5>
                        <p>{test.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
