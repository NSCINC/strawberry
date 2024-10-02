import 'package:flutter/material.dart';

void main() {
  runApp(InvestmentApp());
}

class InvestmentApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Investment App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: InvestmentHome(),
    );
  }
}

class InvestmentPlan {
  String planName;
  int initialInvestment;
  int monthlyReturn;
  int annualReturn;
  int netAnnualReturn;
  int slots;

  InvestmentPlan({
    required this.planName,
    required this.initialInvestment,
    required this.monthlyReturn,
    required this.annualReturn,
    required this.netAnnualReturn,
    required this.slots,
  });
}

class Investment {
  String planName;
  int amount;
  String investorAddress;

  Investment({
    required this.planName,
    required this.amount,
    required this.investorAddress,
  });
}

class HollowEngine {
  List<InvestmentPlan> plans = [];
  List<Investment> investments = [];
  String authenticationContractAddress;

  HollowEngine(this.authenticationContractAddress);

  void addPlan(String planName, int initialInvestment, int monthlyReturn, int annualReturn, int netAnnualReturn, int slots) {
    InvestmentPlan plan = InvestmentPlan(
      planName: planName,
      initialInvestment: initialInvestment,
      monthlyReturn: monthlyReturn,
      annualReturn: annualReturn,
      netAnnualReturn: netAnnualReturn,
      slots: slots,
    );
    plans.add(plan);
    print("Plan '$planName' added successfully!");
  }

  void invest(String planName, int amount, String investorAddress) {
    for (InvestmentPlan plan in plans) {
      if (plan.planName == planName) {
        Investment investment = Investment(planName: planName, amount: amount, investorAddress: investorAddress);
        investments.add(investment);
        print("Investment of $amount completed successfully in plan '$planName'!");
        return;
      }
    }
    print("Error: Investment plan not found: $planName");
  }
}

class InvestmentHome extends StatefulWidget {
  @override
  _InvestmentHomeState createState() => _InvestmentHomeState();
}

class _InvestmentHomeState extends State<InvestmentHome> {
  final HollowEngine engine = HollowEngine("someAuthenticationAddress");
  final TextEditingController planNameController = TextEditingController();
  final TextEditingController initialInvestmentController = TextEditingController();
  final TextEditingController monthlyReturnController = TextEditingController();
  final TextEditingController annualReturnController = TextEditingController();
  final TextEditingController netAnnualReturnController = TextEditingController();
  final TextEditingController slotsController = TextEditingController();
  final TextEditingController investPlanNameController = TextEditingController();
  final TextEditingController investAmountController = TextEditingController();
  final TextEditingController investorAddressController = TextEditingController();

  void _addPlan() {
    engine.addPlan(
      planNameController.text,
      int.parse(initialInvestmentController.text),
      int.parse(monthlyReturnController.text),
      int.parse(annualReturnController.text),
      int.parse(netAnnualReturnController.text),
      int.parse(slotsController.text),
    );

    // Clear input fields
    planNameController.clear();
    initialInvestmentController.clear();
    monthlyReturnController.clear();
    annualReturnController.clear();
    netAnnualReturnController.clear();
    slotsController.clear();
  }

  void _invest() {
    engine.invest(
      investPlanNameController.text,
      int.parse(investAmountController.text),
      investorAddressController.text,
    );

    // Clear input fields
    investPlanNameController.clear();
    investAmountController.clear();
    investorAddressController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Investment App')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Text('Add Investment Plan', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            TextField(controller: planNameController, decoration: InputDecoration(labelText: 'Plan Name')),
            TextField(controller: initialInvestmentController, decoration: InputDecoration(labelText: 'Initial Investment'), keyboardType: TextInputType.number),
            TextField(controller: monthlyReturnController, decoration: InputDecoration(labelText: 'Monthly Return'), keyboardType: TextInputType.number),
            TextField(controller: annualReturnController, decoration: InputDecoration(labelText: 'Annual Return'), keyboardType: TextInputType.number),
            TextField(controller: netAnnualReturnController, decoration: InputDecoration(labelText: 'Net Annual Return'), keyboardType: TextInputType.number),
            TextField(controller: slotsController, decoration: InputDecoration(labelText: 'Slots'), keyboardType: TextInputType.number),
            ElevatedButton(onPressed: _addPlan, child: Text('Add Plan')),
            SizedBox(height: 20),
            Text('Make an Investment', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            TextField(controller: investPlanNameController, decoration: InputDecoration(labelText: 'Investment Plan Name')),
            TextField(controller: investAmountController, decoration: InputDecoration(labelText: 'Investment Amount'), keyboardType: TextInputType.number),
            TextField(controller: investorAddressController, decoration: InputDecoration(labelText: 'Investor Address')),
            ElevatedButton(onPressed: _invest, child: Text('Invest')),
          ],
        ),
      ),
    );
  }
}
