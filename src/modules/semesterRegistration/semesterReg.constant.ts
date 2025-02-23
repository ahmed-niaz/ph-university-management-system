export const SemesterRegistrationStatus = ['upcoming', 'ongoing', 'ended'];

// here we can use an object as read only...
export const RegistrationStatusObj = {
  upcoming: 'upcoming',
  ongoing: 'ongoing',
  ended: 'ended',
} as const;
