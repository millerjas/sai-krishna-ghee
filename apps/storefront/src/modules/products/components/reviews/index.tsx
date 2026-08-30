"use client"

import { useState } from "react"
import { Button, Heading } from "@medusajs/ui"

export interface ReviewItem {
  id: string
  customer_name: string
  rating: number
  title: string
  content: string
  created_at?: string
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "prev_1",
    customer_name: "Rajesh K.",
    rating: 5,
    title: "Pure Bilona Ghee with Authentic Aroma!",
    content: "The aroma when opening the jar brought back childhood memories. Unmatched purity and taste. Perfect for daily cooking and sweets.",
    created_at: "2026-08-15",
  },
  {
    id: "prev_2",
    customer_name: "Ananya M.",
    rating: 5,
    title: "Best A2 Gir Cow Ghee",
    content: "Noticeable difference in texture and digestive health after switching to Sai Krishna Ghee. Highly recommended!",
    created_at: "2026-08-20",
  },
]

export default function ProductReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !title || !content) return

    const newReview: ReviewItem = {
      id: `prev_${Date.now()}`,
      customer_name: name,
      rating,
      title,
      content,
      created_at: new Date().toISOString().split("T")[0],
    }

    setReviews([newReview, ...reviews])
    setStatusMessage("Thank you! Your review has been submitted for moderation.")
    setTimeout(() => {
      setShowModal(false)
      setStatusMessage("")
      setName("")
      setTitle("")
      setContent("")
      setRating(5)
    }, 2000)
  }

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1)

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm my-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#E5E0D8] pb-8 mb-8">
        <div>
          <Heading level="h2" className="text-2xl font-bold text-neutral-900 mb-2">
            Customer Reviews & Ratings
          </Heading>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(Number(avgRating))
                      ? "fill-current text-amber-500"
                      : "text-neutral-300 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-bold text-neutral-900">{avgRating} out of 5</span>
            <span className="text-sm text-neutral-500">({reviews.length} verified reviews)</span>
          </div>
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#B87A28] hover:bg-[#96621E] text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-sm"
        >
          Write a Review
        </Button>
      </div>

      {/* Review List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`w-4 h-4 ${
                        s <= rev.rating ? "fill-current text-amber-500" : "text-neutral-200 fill-current"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-neutral-400">{rev.created_at}</span>
              </div>
              <h4 className="text-base font-semibold text-neutral-900 mb-1">{rev.title}</h4>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{rev.content}</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
              <div className="w-7 h-7 rounded-full bg-[#F5E6D3] text-[#B87A28] flex items-center justify-center font-bold text-xs">
                {rev.customer_name[0]}
              </div>
              <span className="text-xs font-semibold text-neutral-700">{rev.customer_name}</span>
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium ml-auto">
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 p-2"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Write a Product Review</h3>

            {statusMessage ? (
              <div className="p-4 bg-green-50 text-green-800 rounded-xl text-sm font-medium text-center">
                {statusMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <svg
                          className={`w-7 h-7 ${
                            star <= rating ? "fill-current text-amber-500" : "text-neutral-300 fill-current"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87A28]"
                    placeholder="e.g. Priya S."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87A28]"
                    placeholder="e.g. Incredible aroma & quality"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Detailed Feedback</label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B87A28]"
                    placeholder="Share your experience with this ghee..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className="bg-[#B87A28] hover:bg-[#96621E] text-white px-6 py-2 rounded-xl text-sm font-semibold"
                  >
                    Submit Review
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
