import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, Ship, Ticket, Sparkles, Calculator, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
interface ExpenseItem {
  id: string;
  icon: typeof Plane;
  label: string;
  value: number;
  color: string;
}
const initialExpenses: ExpenseItem[] = [{
  id: "flights",
  icon: Plane,
  label: "Flights",
  value: 0,
  color: "bg-secondary"
}, {
  id: "hotels",
  icon: Hotel,
  label: "Hotels",
  value: 0,
  color: "bg-primary"
}, {
  id: "cruises",
  icon: Ship,
  label: "Cruises",
  value: 0,
  color: "bg-gradient-ocean"
}, {
  id: "tickets",
  icon: Ticket,
  label: "Tickets",
  value: 0,
  color: "bg-accent"
}, {
  id: "activities",
  icon: Sparkles,
  label: "Activities",
  value: 0,
  color: "bg-success"
}];
export const TripCalculator = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const updateExpense = (id: string, delta: number) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? {
      ...exp,
      value: Math.max(0, Math.ceil((exp.value + delta) / 50) * 50)
    } : exp));
  };
  const setExpenseValue = (id: string, value: number) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? {
      ...exp,
      value: Math.max(0, Math.ceil(value / 50) * 50)
    } : exp));
  };
  const total = expenses.reduce((sum, exp) => sum + exp.value, 0);
  const roundedTotal = Math.ceil(total / 100) * 100;
  return <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary mb-4">
            <Calculator className="w-4 h-4" />
            Budget Planner
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Trip Cost <span className="text-gradient-sunset">Estimator</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Plan your perfect budget! All expenses are rounded up to the nearest $50 for easy planning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {expenses.map((expense, index) => <motion.div key={expense.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }}>
              <Card className="p-6 bg-card shadow-card hover:shadow-hover transition-all duration-300 border-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${expense.color} rounded-xl flex items-center justify-center shadow-playful`}>
                    <expense.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{expense.label}</h3>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => updateExpense(expense.id, -100)} className="w-10 h-10 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center">
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  
                  <input type="number" value={expense.value} onChange={e => setExpenseValue(expense.id, parseInt(e.target.value) || 0)} className="flex-1 text-center text-2xl font-display font-bold bg-transparent border-b-2 border-border focus:border-primary outline-none py-2" />
                  
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => updateExpense(expense.id, 100)} className="w-10 h-10 rounded-full bg-muted hover:bg-success hover:text-success-foreground transition-colors flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <p className="text-center text-muted-foreground text-sm mt-2">
                  ${expense.value.toLocaleString()}
                </p>
              </Card>
            </motion.div>)}

          {/* Total Card */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.5
        }}>
            <Card className="p-6 bg-gradient-sunset shadow-hover border-0 h-full flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-2 text-center">
                Trip Total
              </h3>
              <motion.p key={roundedTotal} initial={{
              scale: 1.2
            }} animate={{
              scale: 1
            }} className="text-5xl font-display font-bold text-primary-foreground text-center">
                ${roundedTotal.toLocaleString()}
              </motion.p>
              <p className="text-primary-foreground/80 text-center text-sm mt-2">
                Rounded to nearest $100
              </p>
              <Button variant="secondary" className="mt-4 w-full">
                Save Budget
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>;
};