DELETE FROM "Alert" WHERE "type" NOT IN ('Boundary Transition', 'Signal Status', 'Route Deviation', 'Prolonged Inactivity', 'Fleet Update', 'SOS / Distress Signal');
