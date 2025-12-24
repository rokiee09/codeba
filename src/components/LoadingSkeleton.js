import React from 'react';

export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 animate-pulse">
      <div className="h-12 w-12 bg-gray-200 rounded mb-6"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-4 w-20 bg-gray-200 rounded-full mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-18 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 animate-pulse">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

