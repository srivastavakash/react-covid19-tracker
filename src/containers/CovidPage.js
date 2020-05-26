import React from "react";
const CovidPage = () => {
  return (
    <div class="covid-info">
      <div className="container covid-page">
        <div className="card">
          Coronavirus disease (COVID-19) is an infectious disease caused by a
          newly discovered coronavirus. Most people infected with the COVID-19
          virus will experience mild to moderate respiratory illness and recover
          without requiring special treatment. Older people, and those with
          underlying medical problems like cardiovascular disease, diabetes,
          chronic respiratory disease, and cancer are more likely to develop
          serious illness. The COVID-19 virus spreads primarily through droplets
          of saliva or discharge from the nose when an infected person coughs or
          sneezes, so it’s important that you also practice respiratory
          etiquette (for example, by coughing into a flexed elbow).
        </div>
        <div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "left",
                fontFamily: "Montserrat",
                marginTop: "24px"
              }}
            >
              Symptoms
            </div>
            <div>
              <div className="symp-title">Common Symptoms</div>
              <div className="row">
                <div className="col-md-4 col-xs-4 col-sm-4">
                  <div className="symptoms-container">
                    <img
                      alt="img"
                      src="https://corona.topiks.ai/static/media/weather.c8391bc5.svg"
                      className="symp-img"
                    />
                    <p className="symp-name">Fever</p>
                  </div>
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4">
                  <div className="symptoms-container">
                    <img
                      alt="img"
                      src="https://corona.topiks.ai/static/media/cough.846ad721.svg"
                      className="symp-img"
                    />
                    <p className="symp-name">Dry Cough</p>
                  </div>
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4">
                  <div className="symptoms-container">
                    <img
                      alt="img"
                      src="https://corona.topiks.ai/static/media/tiredness.2c2942af.svg"
                      className="symp-img"
                    />
                    <p className="symp-name">Tiredness</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="symp-title">Other Symptoms</div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/lungs.6dd58e1e.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Shortness of Breath</div>
                  <div className="symp-desc">
                    Struggle to breathe or your chest feels heavy
                  </div>
                </div>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/head-aches.f87082ec.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Aches and Pain</div>
                  <div className="symp-desc">
                    Persistent pain or pressure in the chest
                  </div>
                </div>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/sore-throat.8f9b7327.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Sore Throat</div>
                  <div className="symp-desc">Dry cough with a sore throat</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "left",
                marginTop: "20px",
                marginBottom: "20px",
                fontFamily: "Montserrat"
              }}
            >
              Precautions
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/Handwash.039054da.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Wash Hands</div>
                  <div className="symp-desc">
                    Remember to wash hands with soap to avoid spreading the
                    virus.
                  </div>
                </div>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/Handshake.451fd0c2.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Avoid Physical Contact</div>
                  <div className="symp-desc">Maintain distance for safety.</div>
                </div>
                <div className="o-symptoms-container">
                  <img
                    alt="img"
                    src="https://corona.topiks.ai/static/media/public.cad1a160.svg"
                    className="symp-img"
                  />
                  <div className="symp-name">Avoid Public Gatherings</div>
                  <div className="symp-desc">
                    Stay away from crowded places.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", marginBottom: "15%" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "left",
                marginTop: "20px",
                fontFamily: "Montserrat",
                marginBottom: "20px"
              }}
            >
              Myths
            </div>
            <div className="myth-box">
              <div className="myth-text">
                <div className="myth-title">
                  COVID-19 virus can't be transmitted in areas with hot and
                  humid climates
                </div>
                <div className="myth-desc">
                  <span className="myth-red">No. </span>From the evidence so
                  far, the COVID-19 virus can be transmitted in ALL AREAS,
                  including areas with hot and humid weather. Regardless of
                  climate, adopt protective measures if you live in, or travel
                  to an area reporting COVID-19. The best way to protect
                  yourself against COVID-19 is by frequently cleaning your
                  hands. By doing this you eliminate viruses that may be on your
                  hands and avoid infection that could occur by then touching
                  your eyes, mouth, and nose
                </div>
              </div>
            </div>
            <div className="myth-box">
              <div className="myth-text">
                <div className="myth-title">
                  Can eating garlic help prevent infection with the new
                  coronavirus?
                </div>
                <div className="myth-desc">
                  <span className="myth-red">No. </span> Garlic is a healthy
                  food that may have some antimicrobial properties. However,
                  there is no evidence from the current outbreak that eating
                  garlic has protected people from the new coronavirus.
                </div>
              </div>
            </div>
            <div className="myth-box">
              <div className="myth-text">
                <div className="myth-title">
                  Can spraying alcohol or chlorine all over your body kill the
                  new coronavirus?
                </div>
                <div className="myth-desc">
                  <span className="myth-red">No. </span>Spraying alcohol or
                  chlorine all over your body will not kill viruses that have
                  already entered your body. Spraying such substances can be
                  harmful to clothes or mucous membranes (i.e. eyes, mouth). Be
                  aware that both alcohol and chlorine can be useful to
                  disinfect surfaces, but they need to be used under appropriate
                  recommendations.
                </div>
              </div>
            </div>
            <div className="myth-box">
              <div className="myth-text">
                <div className="myth-title">
                  Are antibiotics effective in preventing and treating the new
                  coronavirus?
                </div>
                <div className="myth-desc">
                  <span className="myth-red">No. </span> Antibiotics do not work
                  against viruses, only bacteria. The new coronavirus
                  (2019-nCoV) is a virus and, therefore, antibiotics should not
                  be used as a means of prevention or treatment. However, if you
                  are hospitalized for the 2019-nCoV, you may receive
                  antibiotics because bacterial co-infection is possible.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CovidPage;
