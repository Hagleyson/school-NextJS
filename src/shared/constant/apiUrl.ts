export const urls = {
  auth: {
    login: (): string => `/login`,
    logout: (): string => `/logout`,
  },
  user: {
    get: (): string => `/users/`,
    show: (secure_id: string): string => `/users/${secure_id}`,
    post: (): string => `/users`,
    delete: (secure_id: string): string => `/users/${secure_id}`,
    update: (secure_id: string): string => `/users/${secure_id}`,
  },
  teacher: {
    get: (): string => `/teacher`,
    show: (secure_id: string): string => `/teacher/${secure_id}`,
    post: (): string => `/teacher`,
    delete: (secure_id: string): string => `/teacher/${secure_id}`,
    update: (secure_id: string): string => `/teacher/${secure_id}`,
  },
  courses: {
    get: (): string => `/courses/`,
    show: (secure_id: string): string => `/courses/${secure_id}`,
    post: (): string => `/courses`,
    patch: (secure_id: string): string => `/course_disable/${secure_id}`,
    delete: (secure_id: string): string => `/courses/${secure_id}`,
    update: (secure_id: string): string => `/courses/${secure_id}`,
  },
};
