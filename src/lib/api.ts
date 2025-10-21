// API configuration and types
export interface Stall {
  _id: string;
  name: string;
  code: string;
  deviceName: string;
  status: 'draft' | 'rejected' | 'approved';
  location: number[]; // [latitude, longitude]
  umbrellaCount: number;
  user?: string;
  created?: string;
  updated?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const API_TIMEOUT = 10000; // 10 seconds

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false,
    };
  }
}

// Stalls API functions
export async function getAllStalls(): Promise<ApiResponse<Stall[]>> {
  return apiRequest<Stall[]>('stalls');
}

export async function getStallById(id: string): Promise<ApiResponse<Stall>> {
  return apiRequest<Stall>(`stalls/${id}`);
}

// Utility function to get approved stalls only
export async function getApprovedStalls(): Promise<ApiResponse<Stall[]>> {
  const response = await getAllStalls();
  
  if (!response.success || !response.data) {
    return response;
  }

  const approvedStalls = response.data.filter(stall => stall.status === 'approved');
  
  return {
    data: approvedStalls,
    success: true,
  };
}

// Utility function to get stalls by location (within radius)
export async function getStallsNearLocation(
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<ApiResponse<Stall[]>> {
  const response = await getApprovedStalls();
  
  if (!response.success || !response.data) {
    return response;
  }

  const nearbyStalls = response.data.filter(stall => {
    if (!stall.location || stall.location.length < 2) {
      return false;
    }

    const [stallLat, stallLng] = stall.location;
    const distance = calculateDistance(latitude, longitude, stallLat, stallLng);
    return distance <= radiusKm;
  });

  return {
    data: nearbyStalls,
    success: true,
  };
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
