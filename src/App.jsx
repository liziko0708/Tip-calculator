import { useState, useEffect } from "react";

import splitterSvg from "./assets/splitter.svg";
import dollarSign from "./assets/dollar-sign.svg";
import person from "./assets/person.svg";
import "./App.css";
import "./queries.css";

function App() {
  const [billAmount, setBillAmount] = useState("0");
  const [selectedTipPercentage, setSelectedTipPercentage] = useState("15%");
  const [numberOfPeople, setNumberOfPeople] = useState("0");
  const [tipAmount, setTipAmount] = useState("0");
  const [totalAmount, setTotalAmount] = useState(0);
  const [customTipPercentage, setCustomTipPercentage] = useState("");
  const presentsArr = [
    {
      text: "5%",
      id: "1",
    },
    {
      text: "10%",
      id: "2",
    },
    {
      text: "15%",
      id: "3",
    },
    {
      text: "25%",
      id: "4",
    },
    {
      text: "50%",
      id: "5",
    },
  ];
  const onClickHandler = (id) => {
    // Find the selected percentage option based on the id
    const selectedOption = presentsArr.find((item) => item.id === id);
    console.log(selectedOption.text);

    if (selectedOption) {
      setSelectedTipPercentage(selectedOption.text);
    }
  };

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    let tipPercentage = 0;

    if (selectedTipPercentage === "Custom" && customTipPercentage !== "") {
      tipPercentage = parseFloat(customTipPercentage) / 100;
    } else {
      tipPercentage = parseFloat(selectedTipPercentage.replace("%", "")) / 100;
    }

    const tip = bill * tipPercentage;
    return tip.toFixed(2); // Round the tip to 2 decimal places
  };

  // Update the tip amount whenever billAmount or selectedTipPercentage changes
  useEffect(() => {
    if (billAmount && selectedTipPercentage && numberOfPeople) {
      const tip = calculateTip();
      setTipAmount(tip);
    }
  }, [billAmount, selectedTipPercentage, numberOfPeople, customTipPercentage]);
  const calculateTotalAmountPerPerson = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipAmount);
    const people = parseFloat(numberOfPeople);

    if (bill && tip && people) {
      const total = (bill + tip) / people;
      return total.toFixed(2); // Round the total to 2 decimal places
    }

    return 0;
  };
  const calculateTipPerPerson = () => {
    const tip = parseFloat(tipAmount);
    const people = parseFloat(numberOfPeople);

    if (tip && people) {
      const tipPerPerson = tip / people;
      return tipPerPerson.toFixed(2); // Round the tip per person to 2 decimal places
    }

    return 0;
  };
  const handleCustomTipChange = (e) => {
    setCustomTipPercentage(e.target.value);
  };
  const resetValues = () => {
    setBillAmount("0");
    setSelectedTipPercentage("15%");
    setNumberOfPeople("0");
    setTipAmount("0");
    setCustomTipPercentage("");
  };

  return (
    <div className="main-container">
      <img className="splitter-svg" src={splitterSvg} alt="splitter svg" />
      <div className="calculator-div">
        <div className="container">
          <div className="left">
            <h3>Bill</h3>
            <div className="input-container">
              <img src={dollarSign} alt="dollar-sign" />
              <input
                type="number"
                className="input-field"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
            </div>
            <h3>Select Tip %</h3>

            <div className="precents">
              {presentsArr.map((item) => {
                return (
                  <div
                    onClick={() => onClickHandler(item.id)}
                    key={item.id}
                    className="tip-precent"
                  >
                    {item.text}
                  </div>
                );
              })}
              <input
                type="number"
                placeholder="Custom"
                value={customTipPercentage}
                onChange={handleCustomTipChange}
                className="custom-tip-input"
              />
            </div>
            <h3 className="number-of-persons">Number of People</h3>
            <div className="input-container persons">
              <img src={person} alt="PERSON-SVG" />
              <input
                value={numberOfPeople}
                onChange={(e) => {
                  setNumberOfPeople(e.target.value);
                  console.log(e.target.value);
                }}
                type="number"
                className="input-field"
              />
            </div>
          </div>
          <div className="results">
            <div className="results-container">
              <div className="tip-result">
                <div>
                  <h2>Tip Amount</h2>
                  <h4>/ person</h4>
                </div>
                <div className="price-container">
                  <span>${calculateTipPerPerson()}</span>
                </div>
              </div>
              <div className="total-result">
                <div>
                  <h2>Total</h2>
                  <h4>/ person</h4>
                </div>
                <div className="price-container">
                  <span>${calculateTotalAmountPerPerson()}</span>
                </div>
              </div>
              <button onClick={resetValues} className="reset">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
