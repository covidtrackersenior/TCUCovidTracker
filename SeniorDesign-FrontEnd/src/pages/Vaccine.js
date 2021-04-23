import React from "react";
import "../App.css";

const Vaccine = () =>  {
    return (
        <div>
            <div
                style={{
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            >
                <h1> FAQ about vaccination in US </h1>
                <br />
                <br />
            </div>
        <div
            style={{
                backgroundColor: "white",
                textAlign: "left",
            }}
        >
            <br />
            <p><b> 1. Can a COVID-19 vaccine make me sick with COVID-19?? </b></p>
                <p>No. None of the authorized and recommended COVID-19 vaccines or COVID-19
                    vaccines currently in development in the United States contain the live virus
                    that causes COVID-19. This means that a COVID-19 vaccine cannot make you sick with COVID-19.</p>

                    <p> There are several different types of vaccines in development.
                        All of them teach our immune systems how to recognize and fight the virus that causes COVID-19.
                        Sometimes this process can cause symptoms, such as fever.
                        These symptoms are normal and are a sign that the body is
                        building protection against the virus that causes COVID-19. Learn more about how COVID-19 vaccines work.</p>

                    <p> It typically takes a few weeks for the body to build immunity (protection against the virus that causes COVID-19) after vaccination. That means it’s possible a person could be infected with the virus that causes COVID-19 just before or just after vaccination and still get sick. This is because the vaccine has not had enough time to provide protection.</p>
            <br />
            <p><b>2. After getting a COVID-19 vaccine, will I test positive for COVID-19 on a viral test? </b></p>
                <p>Yes, you should be vaccinated regardless of whether you already had COVID-19. That’s because experts do not yet know how long you are protected from getting sick again after recovering from COVID-19. Even if you have already recovered from COVID-19, it is possible—although rare—that you could be infected with the virus that causes COVID-19 again.
                    Learn more about why getting vaccinated is a safer way to build protection than getting infected.</p>
            <p>If you were treated for COVID-19 with monoclonal antibodies or convalescent plasma, you should wait 90 days before getting a COVID-19 vaccine. Talk to your doctor if you are unsure what treatments you received or if you have more questions about getting a COVID-19 vaccine.</p>
            <p>Experts are still learning more about how long vaccines protect against COVID-19 in real-world conditions. CDC will keep the public informed as new evidence becomes available.</p>
            <br />
            <p><b>3. Will a COVID-19 vaccination protect me from getting sick with COVID-19? </b></p>
                <p>Yes. COVID-19 vaccination works by teaching your immune system how to recognize and fight the virus that causes COVID-19, and this protects you from getting sick with COVID-19.</p>
                <p>Being protected from getting sick is important because even though many people with COVID-19 have only a mild illness, others may get a severe illness, have long-term health effects, or even die. There is no way to know how COVID-19 will affect you, even if you don’t have an increased risk of developing severe complications. Learn more about how COVID-19 vaccines work.</p>
            <br />
            <p><b>4. When will the vaccine be available to me? </b></p>
                <p>Because the supply of COVID-19 vaccine in the United States is currently limited, CDC is providing recommendations to federal, state, and local governments about who should be vaccinated first. CDC’s recommendations are based on those of the Advisory Committee on Immunization Practices (ACIP), an independent panel of medical and public health experts.</p>
                <p>Each state has its own plan for deciding which groups of people will be vaccinated first. You can contact your <a href="https://www.cdc.gov/publichealthgateway/healthdirectories/healthdepartments.html">state health department</a>  for more information on its plan for COVID-19 vaccination.</p>
                <p> The goal is for everyone to be able easily to get a COVID-19 vaccination as soon as large quantities of vaccine are available. As the vaccine supply increases, more groups will be added to receive vaccination. Learn more about CDC recommendations for who should get vaccinated first.</p>
        </div>

        <div
            style={{
                backgroundColor: "white",
                textAlign: "center",
            }}
        >
            <br/>
            <h2>Find nearest vaccination centre</h2>
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "grey",
                    color: "white",
                    margin: "20px",
                    borderRadius: "20px",
                }}
            >
                <h4>Find COVID-19 Vaccines Near You</h4>
                <div style={{ fontSize: "20px" }}>
                    {" "}
                    <a
                        href="https://vaccinefinder.org/search/"
                    >
                        Click here
                    </a>{" "}
                </div>
                <br />
            </div>
            <br />
        </div>
        </div>
    );
}

export default Vaccine;
