class InvestmentPlan:
    def __init__(self, plan_name, initial_investment, monthly_return, annual_return, net_annual_return, slots):
        self.plan_name = plan_name
        self.initial_investment = initial_investment
        self.monthly_return = monthly_return
        self.annual_return = annual_return
        self.net_annual_return = net_annual_return
        self.slots = slots

    def __str__(self):
        return (f"Plan Name: {self.plan_name}\n"
                f"  Initial Investment: {self.initial_investment}\n"
                f"  Monthly Return: {self.monthly_return}\n"
                f"  Annual Return: {self.annual_return}\n"
                f"  Net Annual Return: {self.net_annual_return}\n"
                f"  Slots: {self.slots}\n")


class InvestmentPlanManager:
    def __init__(self):
        self.plans = []

    def _find_plan_index(self, plan_name):
        for index, plan in enumerate(self.plans):
            if plan.plan_name == plan_name:
                return index
        return -1  # Plan not found

    def add_investment_plan(self, plan_name, initial_investment, monthly_return, annual_return, net_annual_return, slots):
        print(f"Adding plan: {plan_name}")
        if self._find_plan_index(plan_name) != -1:
            print("Error: Plan already exists")
            return
        self.plans.append(InvestmentPlan(plan_name, initial_investment, monthly_return, annual_return, net_annual_return, slots))
        print(f"Plan added: {plan_name}")

    def update_investment_plan(self, plan_name, initial_investment=None, monthly_return=None, annual_return=None, net_annual_return=None, slots=None):
        print(f"Updating plan: {plan_name}")
        index = self._find_plan_index(plan_name)
        if index == -1:
            print("Error: Plan does not exist")
            return
        plan = self.plans[index]
        if initial_investment is not None:
            plan.initial_investment = initial_investment
        if monthly_return is not None:
            plan.monthly_return = monthly_return
        if annual_return is not None:
            plan.annual_return = annual_return
        if net_annual_return is not None:
            plan.net_annual_return = net_annual_return
        if slots is not None:
            plan.slots = slots
        print(f"Plan updated: {plan_name}")

    def remove_investment_plan(self, plan_name):
        print(f"Removing plan: {plan_name}")
        index = self._find_plan_index(plan_name)
        if index == -1:
            print("Error: Plan does not exist")
            return
        removed_plan = self.plans.pop(index)
        print(f"Plan removed: {removed_plan.plan_name}")

    def get_investment_plan_details(self, plan_name):
        print(f"Fetching details for plan: {plan_name}")
        index = self._find_plan_index(plan_name)
        if index == -1:
            print("Error: Plan does not exist")
            return None
        return self.plans[index]

    def list_investment_plans(self):
        print("Listing all investment plans:")
        for plan in self.plans:
            print(plan)


# Main application
if __name__ == "__main__":
    manager = InvestmentPlanManager()

    # Step 1: Add an investment plan
    print("\nStep 1: Adding an Investment Plan")
    manager.add_investment_plan("economicPlan", 500, 5, 60, 300, 500)

    # Step 2: Fetch investment plan details
    print("\nStep 2: Fetching Investment Plan Details")
    plan = manager.get_investment_plan_details("economicPlan")
    if plan:
        print(plan)

    # Step 3: Update an investment plan
    print("\nStep 3: Updating an Investment Plan")
    manager.update_investment_plan("economicPlan", None, 10, None, 400, None)

    # Step 4: Fetch updated investment plan details
    print("\nStep 4: Fetching Updated Investment Plan Details")
    plan = manager.get_investment_plan_details("economicPlan")
    if plan:
        print(plan)

    # Step 5: List all investment plans
    print("\nStep 5: Listing All Investment Plans")
    manager.list_investment_plans()

    # Step 6: Remove an investment plan
    print("\nStep 6: Removing an Investment Plan")
    manager.remove_investment_plan("economicPlan")

    # Step 7: List all investment plans after removal
    print("\nStep 7: Listing All Investment Plans After Removal")
    manager.list_investment_plans()
