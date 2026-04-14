"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  X,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/local-storage"
import { CATEGORY_OPTIONS } from "@/lib/categories"
import type { Listing } from "@/types"

const categories = CATEGORY_OPTIONS

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export default function NewListingPage() {
  const router = useRouter()
  const { user, isReady } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [imageInput, setImageInput] = useState("")
  const imageUploadRef = useRef<HTMLInputElement | null>(null)
  const [hours, setHours] = useState<Record<string, { open: string; close: string; closed: boolean }>>({
    Monday: { open: "09:00", close: "17:00", closed: false },
    Tuesday: { open: "09:00", close: "17:00", closed: false },
    Wednesday: { open: "09:00", close: "17:00", closed: false },
    Thursday: { open: "09:00", close: "17:00", closed: false },
    Friday: { open: "09:00", close: "17:00", closed: false },
    Saturday: { open: "10:00", close: "16:00", closed: false },
    Sunday: { open: "10:00", close: "16:00", closed: true },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isReady) return
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent("/dashboard/listings/new")}`)
    }
  }, [isReady, user, router])

  const handleAddImage = () => {
    if (imageInput.trim() && !images.includes(imageInput.trim())) {
      setImages([...images, imageInput.trim()])
      setImageInput("")
    }
  }

  const handleImageUpload = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image." })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2MB." })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      setImages((prev) => (prev.length < 10 ? [...prev, result] : prev))
      toast({ title: "Image added", description: "Upload complete." })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((img) => img !== imageToRemove))
  }

  const handleHoursChange = (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value,
      },
    })
  }

  const buildListing = (): Listing | null => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to submit a listing.",
      })
      router.push("/login")
      return null
    }
    if (!name.trim() || !description.trim() || !category || !address.trim() || !city.trim()) {
      toast({
        title: "Missing details",
        description: "Complete the required listing fields to continue.",
      })
      return null
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60)

    return {
      id: `user-listing-${Date.now()}`,
      title: name,
      slug,
      description,
      images: images.length > 0 ? images : ["/placeholder.svg?height=720&width=960"],
      category: category || "General",
      location: `${city}`,
      address,
      rating: 0,
      reviewsCount: 0,
      tags: [category || "General"],
      contactPhone: phone,
      contactEmail: email,
      website,
      hours: daysOfWeek.map((day) => ({
        day,
        open: hours[day].open,
        close: hours[day].close,
        isClosed: hours[day].closed,
      })),
      owner: user,
      createdAt: new Date().toISOString(),
      isFeatured: false,
      isVerified: false,
      status: "pending",
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    const listing = buildListing()
    if (!listing) {
      setIsSaving(false)
      return
    }
    const stored = loadFromStorage<Listing[]>(storageKeys.listings, [])
    saveToStorage(storageKeys.listings, [listing, ...stored])
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaving(false)
    toast({
      title: "Draft saved",
      description: "Your listing was saved to your dashboard.",
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const listing = buildListing()
    if (!listing) {
      setIsSubmitting(false)
      return
    }
    const stored = loadFromStorage<Listing[]>(storageKeys.listings, [])
    saveToStorage(storageKeys.listings, [listing, ...stored])
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push("/dashboard/listings")
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfb_0%,#faf5f1_100%)] text-[#1a1614]">
        <NavbarShell />
        <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
          <p className="text-[#6b534c]">Loading…</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfb_0%,#faf5f1_100%)] text-[#1a1614]">
        <NavbarShell />
        <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
          <p className="text-[#6b534c]">Redirecting to sign in…</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfb_0%,#faf5f1_50%,#f3e8df_100%)] text-[#1a1614]">
      <NavbarShell />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-[#1a1614] hover:bg-[#fff9f7]"
            >
              <Link href="/listings">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b76e79]">
                Add listing
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-[#1a1614]">
                Publish your studio or lash practice
              </h1>
              <p className="mt-1 text-sm text-[#6b534c]">
                Rich details help guests book with confidence—take your time with photos and hours.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="rounded-full border-[#e0cfc9] bg-white/90 text-[#1a1614] hover:bg-[#fff9f7]"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-full bg-[#b76e79] text-white hover:bg-[#9e5e6a]"
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#e8ddd4] bg-white/95 p-6 shadow-[0_14px_40px_rgba(183,110,121,0.06)]"
            >
              <h2 className="mb-6 text-lg font-semibold text-[#1a1614]">Basic Information</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter business name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-[#e8ddd4] bg-white/95 p-6 shadow-[0_14px_40px_rgba(183,110,121,0.06)]"
            >
              <h2 className="mb-6 text-lg font-semibold text-[#1a1614]">Contact Information</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.business.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-[#e8ddd4] bg-white/95 p-6 shadow-[0_14px_40px_rgba(183,110,121,0.06)]"
            >
              <h2 className="mb-6 text-lg font-semibold text-[#1a1614]">
                <Clock className="mr-2 inline h-5 w-5" />
                Business Hours
              </h2>
              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium">{day}</div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${day}-closed`}
                        checked={hours[day].closed}
                        onCheckedChange={(checked) =>
                          handleHoursChange(day, "closed", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`${day}-closed`}
                        className="text-sm font-normal"
                      >
                        Closed
                      </Label>
                    </div>
                    {!hours[day].closed && (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={hours[day].open}
                          onChange={(e) =>
                            handleHoursChange(day, "open", e.target.value)
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={hours[day].close}
                          onChange={(e) =>
                            handleHoursChange(day, "close", e.target.value)
                          }
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-[#e8ddd4] bg-white/95 p-6 shadow-[0_14px_40px_rgba(183,110,121,0.06)]"
            >
              <Label className="mb-4 block text-[#1a1614]">
                <ImageIcon className="mr-2 inline h-4 w-4" />
                Business Photos
              </Label>
              
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Paste image URL..."
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddImage()
                    }
                  }}
                />
                <Button variant="outline" size="icon" onClick={handleAddImage}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <Input
                  ref={imageUploadRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => imageUploadRef.current?.click()}
                  disabled={images.length >= 10}
                >
                  Upload Image
                </Button>
                <span className="text-xs text-muted-foreground">
                  Add up to 10 images
                </span>
              </div>

              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={img}
                        alt={`Business photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(img)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#e0cfc9] transition-colors hover:border-[#b76e79]/40">
                  <ImageIcon className="h-8 w-8 text-[#b76e79]" />
                  <p className="text-center text-sm text-[#6b534c]">Add photos of your business</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Add up to 10 photos. First photo will be used as the main image.
              </p>
            </motion.div>

            {/* Submission Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-[#e8ddd4] bg-[#fffdfb] p-6 shadow-[0_14px_40px_rgba(183,110,121,0.05)]"
            >
              <h3 className="mb-4 font-semibold text-[#1a1614]">Submission guidelines</h3>
              <ul className="space-y-2 text-sm text-[#5c4a45]">
                <li>— Listings are reviewed for accuracy and guest safety before publishing.</li>
                <li>— Use real studio imagery and truthful service descriptions.</li>
                <li>— Most reviews finish within one to two business days.</li>
                <li>— You will hear from us if we need clarifications or edits.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
