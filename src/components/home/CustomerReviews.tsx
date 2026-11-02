import React from 'react';
import { Star, CheckCircle, Quote, ExternalLink, ThumbsUp } from 'lucide-react';
import { INITIAL_REVIEWS, INITIAL_SETTINGS } from '@/lib/data';

export default function CustomerReviews() {
  const reviews = INITIAL_REVIEWS;

  return (
    <section id="reviews" className="py-20 bg-ivory-50 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-700 block mb-2">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-onyx-950">
            Loved by Hyderabad
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-sm text-onyx-600 leading-relaxed">
            Real feedback from valued clients at our Vijaya Nagar Colony salon.
          </p>
        </div>

        {/* Big Rating Summary Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-white border border-gold-500/30 shadow-luxury max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-center md:text-left">
            <div className="md:col-span-4 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gold-500/20 pb-6 md:pb-0 md:pr-6">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-onyx-950">
                4.8
              </span>
              <div className="flex text-yellow-400 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-onyx-700">
                Based on 1,480+ Google Reviews
              </span>
              <a
                href="https://maps.app.goo.gl/fo7U1cfaB6Y6Pt1ZA?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-700 font-bold mt-3 hover:underline"
              >
                <span>View verified Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="md:col-span-8 space-y-2.5">
              {[
                { stars: '5 Star', pct: '92%' },
                { stars: '4 Star', pct: '6%' },
                { stars: '3 Star', pct: '1%' },
                { stars: '2 Star', pct: '<1%' },
                { stars: '1 Star', pct: '<1%' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-onyx-600 font-medium text-right">{row.stars}</span>
                  <div className="flex-1 h-2 rounded-full bg-ivory-200 overflow-hidden">
                    <div 
                      className="h-full bg-gold-500 rounded-full" 
                      style={{ width: row.pct }} 
                    />
                  </div>
                  <span className="w-10 text-onyx-500 font-medium">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-7 rounded-3xl bg-white border border-gold-500/25 shadow-luxury flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-onyx-400 font-medium">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-onyx-700 leading-relaxed italic relative">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gold-500/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-onyx-950 flex items-center gap-1.5">
                    {review.author}
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-gold-700 font-medium block mt-0.5">
                    Service: {review.serviceDone}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-400/40 flex items-center justify-center text-gold-700 text-xs font-bold font-serif">
                  {review.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
