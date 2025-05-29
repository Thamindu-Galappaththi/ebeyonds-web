import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/common/HeroSection';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Checkbox from '../../components/ui/Checkbox';
import Textarea from '../../components/ui/Textarea';

const MovieLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Batman Returns',
      image: '/images/img_rectangle_4.png',
      description: 'Lorem ipsum dolor sit amet, \nconsetetur sadipscing elitr, sed diam \nnonumy eirmod tempor invidunt ut…'
    },
    {
      id: 2,
      title: 'Wild Wild West',
      image: '/images/img_rectangle_4_606x427.png',
      description: 'Lorem ipsum dolor sit amet, \nconsetetur sadipscing elitr, sed diam \nnonumy eirmod tempor invidunt ut…'
    },
    {
      id: 3,
      title: 'The Amazing Spiderman',
      image: '/images/img_rectangle_4_1.png',
      description: 'Lorem ipsum dolor sit amet, \nconsetetur sadipscing elitr, sed diam \nnonumy eirmod tempor invidunt ut…'
    }
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleRemoveMovie = (movieId) => {
    setMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    alert('Form submitted successfully!');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      message: ''
    });
    setAgreeToTerms(false);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      
      {/* Movie Collection Section */}
      <section className="bg-[#1d1d1d] py-[56px] px-[114px]">
        <div className="flex justify-between items-center mb-[82px]">
          <h2 className="text-white text-[36px] font-bold leading-[35px] font-din-alternate">
            Collect your favourites
          </h2>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-transparent border border-white rounded-[4px] px-4 py-3 w-[424px]">
              <img
                src="/images/img_vector.svg"
                alt="Search"
                className="w-[20px] h-[20px] mr-3"
              />
              <input
                type="text"
                placeholder="Search title and add to grid"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent text-[#a3a3a3] text-[18px] font-normal leading-[25px] font-open-sans flex-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-[1332px] h-[2px] bg-white mb-[61px]"></div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="relative">
              {/* Movie Image */}
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-[427px] h-[606px] object-cover rounded-lg"
                />
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="absolute top-3 right-3 w-[57px] h-[57px] bg-[#1d1d1d] bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                  <img
                    src="/images/img_group_2.svg"
                    alt="Remove"
                    className="w-[12px] h-[12px]"
                  />
                </button>
              </div>
              
              {/* Movie Info */}
              <div className="bg-[#3c3c3c] p-6 rounded-b-lg">
                <h3 className="text-white text-[32px] font-normal leading-[32px] font-din-alternate mb-4">
                  {movie.title}
                </h3>
                <p className="text-[#eaeaea] text-[18px] font-medium leading-[27px] font-inter whitespace-pre-line">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#b7b7b7] text-[20px] font-normal">
              No movies found matching your search.
            </p>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-black py-[103px] px-[109px]">
        <h2 className="text-white text-[36px] font-bold leading-[35px] font-din-alternate mb-[17px]">
          How to reach us
        </h2>
        <p className="text-[#b7b7b7] text-[20px] font-normal leading-[29px] font-open-sans mb-[97px]">
          Lorem ipsum dolor sit amet, consetetur.
        </p>

        <div className="flex gap-[76px]">
          {/* Contact Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-[31px]">
              {/* First Row - First Name and Last Name */}
              <div className="grid grid-cols-2 gap-[29px]">
                <InputField
                  label="First Name *"
                  value={formData.firstName}
                  onChange={handleFormChange('firstName')}
                  required
                  className="h-[46px] w-[226px]"
                />
                <InputField
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={handleFormChange('lastName')}
                  required
                  className="h-[46px] w-[226px]"
                />
              </div>

              {/* Email */}
              <InputField
                label="Email *"
                type="email"
                value={formData.email}
                onChange={handleFormChange('email')}
                required
                className="h-[46px] w-[481px]"
              />

              {/* Telephone */}
              <InputField
                label="Telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleFormChange('telephone')}
                className="h-[46px] w-[481px]"
              />

              {/* Message */}
              <Textarea
                label="Message"
                value={formData.message}
                onChange={handleFormChange('message')}
                rows={5}
                className="w-[481px] h-[115px]"
              />

              {/* Required Fields Note */}
              <p className="text-[#b7b7b7] text-[18px] font-normal leading-[25px] font-open-sans">
                *required fields
              </p>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span className="text-[#b7b7b7] text-[20px] font-normal leading-[25px] font-open-sans">
                  I agree to the{' '}
                  <span className="text-white">Terms & Conditions</span>
                </span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-[242px] h-[49px] rounded-[5px] text-[16px] font-medium leading-[20px] font-inter"
              >
                SUBMIT
              </Button>
            </form>
          </div>

          {/* Map */}
          <div className="w-[588px] h-[588px]">
            <img
              src="/images/img_image_1.png"
              alt="Location Map - Madrid, Spain"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MovieLibrary;