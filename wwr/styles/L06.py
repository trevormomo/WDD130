import numpy as np

# Constants
EARTH_ACCELERATION_OF_GRAVITY = 9.80665  # m/s^2
WATER_DENSITY = 998.2  # kg/m^3
WATER_DYNAMIC_VISCOSITY = 0.0010016  # Pa s
CONVERSION_FACTOR_KPA_TO_PSI = 0.145038  # Conversion factor from kPa to psi


def pressure_loss_from_fittings(fluid_velocity, quantity_fittings):
    """Calculate pressure loss due to fittings."""
    pressure_loss = -0.04 * WATER_DENSITY * fluid_velocity**2 * quantity_fittings / 2000
    return pressure_loss


def reynolds_number(hydraulic_diameter, fluid_velocity):
    """Calculate Reynolds number."""
    reynolds = (WATER_DENSITY * hydraulic_diameter * fluid_velocity) / WATER_DYNAMIC_VISCOSITY
    return reynolds


def pressure_loss_from_pipe_reduction(larger_diameter, fluid_velocity, reynolds_number, smaller_diameter):
    """Calculate pressure loss due to pipe reduction."""
    k = 0.1 + (50 / reynolds_number) * (larger_diameter / smaller_diameter)**(1/4 - 1)
    pressure_loss = -k * WATER_DENSITY * fluid_velocity**2 / 2000
    return pressure_loss


def kpa_to_psi(pressure_kpa):
    """Convert pressure from kilopascals (kPa) to pounds per square inch (psi)."""
    pressure_psi = pressure_kpa * CONVERSION_FACTOR_KPA_TO_PSI
    return pressure_psi


# Additional features


def main():
    tower_height = float(input("Height of water tower (meters): "))
    tank_height = float(input("Height of water tank walls (meters): "))
    length1 = float(input("Length of supply pipe from tank to lot (meters): "))
    quantity_angles = int(input("Number of 90° angles in supply pipe: "))
    length2 = float(input("Length of pipe from supply to house (meters): "))

    water_height = tower_height + tank_height
    pressure = water_height * WATER_DENSITY * EARTH_ACCELERATION_OF_GRAVITY / 1000  # Convert to kPa

    diameter = PVC_SCHED80_INNER_DIAMETER
    friction = PVC_SCHED80_FRICTION_FACTOR
    velocity = SUPPLY_VELOCITY
    reynolds = reynolds_number(diameter, velocity)
    loss = pressure_loss_from_pipe(diameter, length1, friction, velocity)
    pressure += loss

    loss = pressure_loss_from_fittings(velocity, quantity_angles)
    pressure += loss

    loss = pressure_loss_from_pipe_reduction(diameter,
                                             velocity, reynolds, HDPE_SDR11_INNER_DIAMETER)
    pressure += loss

    diameter = HDPE_SDR11_INNER_DIAMETER
    friction = HDPE_SDR11_FRICTION_FACTOR
    velocity = HOUSEHOLD_VELOCITY
    loss = pressure_loss_from_pipe(diameter, length2, friction, velocity)
    pressure += loss

    print(f"Pressure at house: {pressure:.1f} kilopascals")
    print(f"Pressure at house: {kpa_to_psi(pressure):.1f} pounds per square inch")


if __name__ == "__main__":
    main()
