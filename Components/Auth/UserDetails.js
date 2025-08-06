import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// Update your react-icons imports at the top of the file:
import { 
  FaUser, FaTint, FaSignOutAlt, 
  FaInfoCircle, FaCalendarAlt, FaHistory, 
  FaQuestionCircle, FaBook, FaUniversalAccess, 
  FaTimes, FaComment 
} from 'react-icons/fa';
import './UserDetails.css';
import SocialShare from '../Shared/SocialShare';


const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Accessibility state
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    textSize: 16,
    isGrayscale: false,
    isHighContrast: false,
    isNegativeContrast: false,
    isLightBackground: false,
    areLinksUnderlined: false,
    isReadableFont: false
  });

  // Apply accessibility settings
  useEffect(() => {
    document.documentElement.style.fontSize = `${accessibilitySettings.textSize}px`;
    const bodyClasses = document.body.classList;
    bodyClasses.toggle('grayscale', accessibilitySettings.isGrayscale);
    bodyClasses.toggle('high-contrast', accessibilitySettings.isHighContrast);
    bodyClasses.toggle('negative-contrast', accessibilitySettings.isNegativeContrast);
    bodyClasses.toggle('light-background', accessibilitySettings.isLightBackground);
    bodyClasses.toggle('links-underlined', accessibilitySettings.areLinksUnderlined);
    bodyClasses.toggle('readable-font', accessibilitySettings.isReadableFont);
    
    return () => {
      document.documentElement.style.fontSize = '';
      bodyClasses.remove(
        'grayscale', 'high-contrast', 'negative-contrast', 
        'light-background', 'links-underlined', 'readable-font'
      );
    };
  }, [accessibilitySettings]);

  const handleAccessibilityAction = (action) => {
    switch(action) {
      case 'increase-text':
        setAccessibilitySettings(prev => ({
          ...prev,
          textSize: Math.min(prev.textSize + 2, 24)
        }));
        break;
      case 'decrease-text':
        setAccessibilitySettings(prev => ({
          ...prev,
          textSize: Math.max(prev.textSize - 2, 12)
        }));
        break;
      case 'grayscale':
        setAccessibilitySettings(prev => ({
          ...prev,
          isGrayscale: !prev.isGrayscale
        }));
        break;
      case 'high-contrast':
        setAccessibilitySettings(prev => ({
          ...prev,
          isHighContrast: !prev.isHighContrast,
          isNegativeContrast: false
        }));
        break;
      case 'negative-contrast':
        setAccessibilitySettings(prev => ({
          ...prev,
          isNegativeContrast: !prev.isNegativeContrast,
          isHighContrast: false
        }));
        break;
      case 'light-background':
        setAccessibilitySettings(prev => ({
          ...prev,
          isLightBackground: !prev.isLightBackground
        }));
        break;
      case 'links-underline':
        setAccessibilitySettings(prev => ({
          ...prev,
          areLinksUnderlined: !prev.areLinksUnderlined
        }));
        break;
      case 'readable-font':
        setAccessibilitySettings(prev => ({
          ...prev,
          isReadableFont: !prev.isReadableFont
        }));
        break;
      case 'reset':
        setAccessibilitySettings({
          textSize: 16,
          isGrayscale: false,
          isHighContrast: false,
          isNegativeContrast: false,
          isLightBackground: false,
          areLinksUnderlined: false,
          isReadableFont: false
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3001/api/auth/getUserDetails', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const getFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="blood-drop-loader"></div>
        <p>Loading your information...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-screen">
        <p>Failed to load user data. Please try again later.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      {/* Accessibility Button */}
      <button 
        className="accessibility-button"
        onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
      >
        <FaUniversalAccess />
      </button>

      {/* Accessibility Menu */}
      {isAccessibilityOpen && (
        <div className="accessibility-menu">
          <div className="accessibility-header">
            <h3>Accessibility Menu</h3>
            <button 
              className="close-button"
              onClick={() => setIsAccessibilityOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <ul>
            <li className="increase-text" onClick={() => handleAccessibilityAction('increase-text')}>
              Increase Text
            </li>
            <li className="decrease-text" onClick={() => handleAccessibilityAction('decrease-text')}>
              Decrease Text
            </li>
            <li className="grayscale" onClick={() => handleAccessibilityAction('grayscale')}>
              Grayscale {accessibilitySettings.isGrayscale && '(Active)'}
            </li>
            <li className="high-contrast" onClick={() => handleAccessibilityAction('high-contrast')}>
              High Contrast {accessibilitySettings.isHighContrast && '(Active)'}
            </li>
            <li className="negative-contrast" onClick={() => handleAccessibilityAction('negative-contrast')}>
              Negative Contrast {accessibilitySettings.isNegativeContrast && '(Active)'}
            </li>
            <li className="light-background" onClick={() => handleAccessibilityAction('light-background')}>
              Light Background {accessibilitySettings.isLightBackground && '(Active)'}
            </li>
            <li className="links-underline" onClick={() => handleAccessibilityAction('links-underline')}>
              Links Underline {accessibilitySettings.areLinksUnderlined && '(Active)'}
            </li>
            <li className="readable-font" onClick={() => handleAccessibilityAction('readable-font')}>
              Readable Font {accessibilitySettings.isReadableFont && '(Active)'}
            </li>
            <li className="reset" onClick={() => handleAccessibilityAction('reset')}>
              Reset
            </li>
          </ul>
        </div>
      )}

      {/* Navbar */}
      <nav className="blood-navbar">
        <div className="navbar-brand">
          <FaTint className="blood-icon" />
          <span>LifeBlood</span>
        </div>
        
        <div className="navbar-links">
          <Link to="/appointments"><FaCalendarAlt /> Appointments</Link>
          <Link to="/donation-history"><FaHistory /> History</Link>
          <Link to="/eligibility-quiz"><FaQuestionCircle /> Eligibility Quiz</Link>
          <Link to="/education"><FaBook /> FAQ</Link>
          <Link to="/blood-compatibility"><FaTint /> Compatibility</Link>
          <Link to="/donation-centers"><FaTint /> Centers</Link>
          <Link to="/post-donation-tips"><FaInfoCircle /> Post Tips</Link>
          <Link to="/feedback"><FaComment /> Feedback</Link>
        </div>
        
        <div className="user-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaUser className="user-icon" />
          <span>{getFirstName()}</span>
          
          {isMenuOpen && (
            <div className="dropdown-menu">
              <Link to="/profile"><FaUser /> My Profile</Link>
              <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      {window.location.pathname === '/locate-us' ? (
        <div className="map-container">
          <h2>Our Location in Uttara</h2>
          <div className="map-embed">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.427813500611!2d90.3912663154314!3d23.87048598453144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c422d0495d2b%3A0x1e3a9a26e3a9a26e!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
              title="Uttara Location"
            ></iframe>
          </div>
          <button 
            className="btn-primary" 
            onClick={() => navigate(-1)}
            style={{marginTop: '20px'}}
          >
            Back to Profile
          </button>
        </div>
      ) : (
        <div className="user-profile-container">
          <div className="profile-header">
            <div className="avatar-container">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2>{user.name}</h2>
              <p className="blood-type">Blood Type: {user.bloodType || 'Not specified'}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-card">
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Mobile:</span>
                <span className="detail-value">{user.mobile || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Donation:</span>
                <span className="detail-value">{user.lastDonation || 'No donation history'}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Donation Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{user.donationCount || 0}</div>
                  <div className="stat-label">Donations</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{user.totalDonated ? `${user.totalDonated}L` : '0L'}</div>
                  <div className="stat-label">Total Donated</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{user.livesSaved || 0}</div>
                  <div className="stat-label">Lives Saved</div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              
              <SocialShare donationCount={user.donationCount || 0} />
              <button 
              className="share-button" 
              onClick={handleLogout}
              style={{ backgroundColor: '#ff4757' }} // Same red as SocialShare
              >
              <FaSignOutAlt /> Logout
            </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;