
-- Ensure the Admin Role exists
INSERT INTO "Role" (id, name, "updatedAt") 
VALUES ('a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'ADMIN', NOW()) 
ON CONFLICT (name) DO NOTHING;

-- Ensure the Real-time Vessel "Shaheen" exists with the correct MMSI
-- No mock data, just the vessel registry to enable the hardware link.
INSERT INTO "Vessel" (id, name, imo, mmsi, type, "updatedAt") 
VALUES ('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'Shaheen', 'IMO9876543', '987654321', 'FISHING', NOW()) 
ON CONFLICT (mmsi) DO UPDATE SET name = EXCLUDED.name;
