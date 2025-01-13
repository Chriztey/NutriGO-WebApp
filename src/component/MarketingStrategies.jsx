import React from "react";

export default function MarketingStrategies() {
  return (
    <div className="bg-white/50 backdrop-blur-lg border-none shadow-lg rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-indigo-900">
          Marketing Strategies
        </h2>
      </div>
      <div className="space-y-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">
            Social Media Campaign
          </h3>
          <p className="text-sm text-purple-700">
            Launch a targeted social media campaign focusing on the benefits of
            the top 3 less fulfilled vitamins. Use influencer partnerships to
            increase reach and credibility.
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            Educational Content
          </h3>
          <p className="text-sm text-blue-700">
            Create and distribute educational content (blog posts, infographics,
            videos) about the importance of these vitamins and how our products
            address deficiencies.
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            Product Bundling
          </h3>
          <p className="text-sm text-green-700">
            Develop product bundles that combine the less fulfilled vitamins
            with our popular products. Offer discounts on these bundles to
            encourage purchases.
          </p>
        </div>
      </div>
    </div>
  );
}
