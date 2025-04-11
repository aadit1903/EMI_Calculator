function calculateEMI() {
    const price = parseFloat(document.getElementById("price").value);
    const downPayment = parseFloat(document.getElementById("downPayment").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const tenure = parseFloat(document.getElementById("tenure").value);
  
    const principal = price - downPayment;
    const monthlyRate = rate / 12 / 100;
  
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
                (Math.pow(1 + monthlyRate, tenure) - 1);
  
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
  
    document.getElementById("emi").innerText = `EMI Amount: ₹${emi.toFixed(2)}`;
    document.getElementById("interest").innerText = `Total Interest Payable: ₹${totalInterest.toFixed(2)}`;
    document.getElementById("total").innerText = `Total Amount Payable: ₹${totalPayment.toFixed(2)}`;
  
    renderChart(principal, totalInterest);
  }
  
  function renderChart(principal, interest) {
    const total = principal + interest;
    const ctx = document.getElementById("pieChart").getContext("2d");
  
    if (window.pie) window.pie.destroy();
  
    window.pie = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Principal Amount", "Total Interest"],
        datasets: [{
          data: [principal, interest],
          backgroundColor: ["#4a67ff", "#00cc99"]
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "bottom"
          },
          datalabels: {
            formatter: (value, context) => {
              const percentage = (value / total) * 100;
              return percentage.toFixed(2) + '%';
            },
            color: '#fff',
            font: {
              weight: 'bold',
              size: 14
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }
  
  
  