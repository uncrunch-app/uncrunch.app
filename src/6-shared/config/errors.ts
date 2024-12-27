export const ERRORS = {
  session: {
    userNotFound: 'User not found in session',
    
  },
  apiQuery: {
    userDataNotFound: 'User data not found'
  },
  misc: {
    yearExceeded: 'Start year cannot be greater than the current year.'
  }
} as const
