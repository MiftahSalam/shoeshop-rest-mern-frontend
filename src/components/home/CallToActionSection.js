import React from 'react';

const CallToActionSection = () => {
  return (
    <div className="subcribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Do you need more tips?</h2>
              <p>Signup for freee and get latest tips.</p>
              <form className="form-section">
                <input placeholder="Your Email..." name="email" type="email" />
                <input value="Yes, I want!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;