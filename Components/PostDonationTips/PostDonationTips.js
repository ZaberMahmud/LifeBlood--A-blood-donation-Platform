import React, { useState } from 'react';
import { 
  FaHeartbeat, FaGlassWhiskey, FaBandAid, 
  FaHamburger, FaWineGlassAlt, FaHeart,
  FaTint, FaClock, FaCalendarDay, FaBed,
  FaRunning, FaSwimmingPool, FaUtensils,
  FaProcedures, FaRegSmile, FaRegLightbulb,
  FaThermometer, FaUmbrellaBeach, FaBookMedical,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './PostDonationTips.css';

const PostDonationTips = () => {
  const [activePhase, setActivePhase] = useState('immediate');
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const tipsData = {
    immediate: [
      {
        title: 'Initial Rest Period',
        content: 'Remain seated for 15-20 minutes after donation.',
        detail: 'This helps prevent dizziness and allows your circulatory system to adjust to the slight reduction in blood volume.',
        icon: <FaBed className="icon" />,
      },
      {
        title: 'Hydration Protocol',
        content: 'Drink at least 500ml of fluids before leaving.',
        detail: 'Water, juice, or electrolyte drinks help restore plasma volume quickly. Avoid very cold drinks which can cause stomach cramps.',
        icon: <FaGlassWhiskey className="icon" />,
      },
      {
        title: 'Bandage Management',
        content: 'Keep pressure bandage for 4-5 hours.',
        detail: 'The bandage helps clotting at the needle site. After removal, clean area with soap and water. Avoid scratching the site.',
        icon: <FaBandAid className="icon" />,
      },
      {
        title: 'Temperature Regulation',
        content: 'Avoid extreme temperatures for several hours.',
        detail: 'Both hot showers and cold environments can stress your cardiovascular system while it\'s recovering.',
        icon: <FaThermometer className="icon" />,
      },
      {
        title: 'Physical Restrictions',
        content: 'No heavy lifting with donation arm for 12 hours.',
        detail: 'The vein needs time to heal completely. Use your non-donation arm for carrying items when possible.',
        icon: <FaRunning className="icon" />,
      },
      {
        title: 'Self-Monitoring',
        content: 'Watch for dizziness or unusual fatigue.',
        detail: 'If symptoms occur, sit or lie down immediately. Elevate your legs if feeling faint. Symptoms typically pass within 30 minutes.',
        icon: <FaHeartbeat className="icon" />,
      },
      {
        title: 'Nutrition Guidance',
        content: 'Eat a substantial meal within 2 hours.',
        detail: 'Include protein and complex carbohydrates to help rebuild blood components. Avoid greasy foods which can cause nausea.',
        icon: <FaUtensils className="icon" />,
      },
      {
        title: 'Activity Planning',
        content: 'Cancel strenuous activities for the day.',
        detail: 'This includes workouts, manual labor, or extended standing. Light walking is encouraged to maintain circulation.',
        icon: <FaUmbrellaBeach className="icon" />,
      }
    ],
    '24-hours': [
      {
        title: 'Iron Replenishment',
        content: 'Consume iron-rich foods at two meals.',
        detail: 'Excellent sources: red meat, spinach, lentils, fortified cereals. Pair with vitamin C (citrus) to enhance absorption.',
        icon: <FaHamburger className="icon" />,
      },
      {
        title: 'Alcohol Avoidance',
        content: 'No alcohol for 24 hours post-donation.',
        detail: 'Alcohol causes dehydration and can delay recovery. It may also increase dizziness or lightheadedness.',
        icon: <FaWineGlassAlt className="icon" />,
      },
      {
        title: 'Fluid Continuation',
        content: 'Drink 25% more fluids than usual.',
        detail: 'Monitor urine color - pale yellow indicates good hydration. Include electrolyte solutions if sweating heavily.',
        icon: <FaTint className="icon" />,
      },
      {
        title: 'Exercise Moderation',
        content: 'Limit to light activities only.',
        detail: 'Walking and gentle stretching are good. Avoid weight training, running, or competitive sports today.',
        icon: <FaSwimmingPool className="icon" />,
      },
      {
        title: 'Elevation Technique',
        content: 'Lie down with legs up if feeling faint.',
        detail: 'This position helps blood flow to your brain more effectively if you experience lightheadedness.',
        icon: <FaProcedures className="icon" />,
      },
      {
        title: 'Wound Monitoring',
        content: 'Check needle site for unusual swelling.',
        detail: 'Minor bruising is normal. Contact the donation center if you experience severe pain, swelling, or bleeding.',
        icon: <FaBookMedical className="icon" />,
      },
      {
        title: 'Rest Prioritization',
        content: 'Get 7-8 hours of quality sleep.',
        detail: 'Your body does most blood cell regeneration during sleep. Consider an extra 30-60 minutes of rest.',
        icon: <FaRegSmile className="icon" />,
      },
      {
        title: 'Medication Review',
        content: 'Check with doctor about medications.',
        detail: 'Particularly blood thinners or NSAIDs. Most medications can be resumed normally after donation.',
        icon: <FaRegLightbulb className="icon" />,
      }
    ],
    '1-week': [
      {
        title: 'Hydration Maintenance',
        content: 'Continue extra fluids for 3-5 days.',
        detail: 'Your plasma volume will be completely restored in about 48 hours, but fluids aid overall recovery.',
        icon: <FaGlassWhiskey className="icon" />,
      },
      {
        title: 'Iron Optimization',
        content: 'Include iron sources in every meal.',
        detail: 'It takes 4-6 weeks to fully replace donated red blood cells. Pair iron with vitamin C for better absorption.',
        icon: <FaUtensils className="icon" />,
      },
      {
        title: 'Exercise Progression',
        content: 'Gradually return to normal workouts.',
        detail: 'Start at 50% intensity and duration, increasing slowly over 3-4 days. Listen to your body\'s signals.',
        icon: <FaRunning className="icon" />,
      },
      {
        title: 'Energy Awareness',
        content: 'Full energy returns in 2-3 weeks.',
        detail: 'Red blood cell regeneration takes time. Nap if needed and don\'t push through unusual fatigue.',
        icon: <FaHeartbeat className="icon" />,
      },
      {
        title: 'Next Donation Planning',
        content: 'Eligible again in 8 weeks.',
        detail: 'Whole blood donors can give every 56 days. Consider setting a reminder for your next donation appointment.',
        icon: <FaCalendarDay className="icon" />,
      },
      {
        title: 'Community Engagement',
        content: 'Share your donation experience.',
        detail: 'Your story could inspire 3-5 new donors. Post on social media or tell friends about the process.',
        icon: <FaRegSmile className="icon" />,
      },
      {
        title: 'Wellness Check',
        content: 'Monitor for unusual symptoms.',
        detail: 'While rare, contact the donation center if you experience prolonged fatigue, dizziness, or other concerns.',
        icon: <FaBookMedical className="icon" />,
      },
      {
        title: 'Reward Yourself',
        content: 'Acknowledge your contribution.',
        detail: 'You\'ve done something remarkable! Enjoy a special treat or activity to celebrate your generosity.',
        icon: <FaHeart className="icon" />,
      }
    ]
  };

  return (
    <div className="recovery-guide">
      <div className="guide-header">
        <h1>Post-Donation Care Guide</h1>
        <p>Essential tips to help your body recover after donating blood</p>
      </div>

      <div className="phase-tabs">
        <button 
          className={`tab ${activePhase === 'immediate' ? 'active' : ''}`}
          onClick={() => setActivePhase('immediate')}
        >
          <FaClock /> First Hours
        </button>
        <button 
          className={`tab ${activePhase === '24-hours' ? 'active' : ''}`}
          onClick={() => setActivePhase('24-hours')}
        >
          <FaClock /> Next 24h
        </button>
        <button 
          className={`tab ${activePhase === '1-week' ? 'active' : ''}`}
          onClick={() => setActivePhase('1-week')}
        >
          <FaCalendarDay /> Full Week
        </button>
      </div>

      <div className="tips-grid">
        {tipsData[activePhase].map((tip, index) => (
          <div 
            key={index} 
            className={`tip-card ${expandedTip === index ? 'expanded' : ''}`}
            onClick={() => toggleTip(index)}
          >
            <div className="tip-header">
              <div className="tip-icon-container">
                {tip.icon}
              </div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
              <div className="expand-icon">
                {expandedTip === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {expandedTip === index && (
              <div className="tip-detail">
                <p>{tip.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="motivational-banner">
        <div className="banner-content">
          <h3>Your Donation Makes a Difference</h3>
          <p>Each blood donation can save up to 3 lives. Thank you for being a hero!</p>
        </div>
      </div>
    </div>
  );
};

export default PostDonationTips;