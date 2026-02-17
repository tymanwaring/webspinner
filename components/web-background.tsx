"use client"

import { useCallback, useEffect, useRef } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function WebBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const reducedMotion = useReducedMotion()

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h)

      // Smooth mouse follow
      if (!reducedMotion) {
        mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05
        mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05
      }

      const cx = w / 2
      const cy = h / 2
      const maxRadius = Math.max(w, h) * 0.45
      const rings = 8
      const radials = 16

      const offsetX = reducedMotion ? 0 : (mouseRef.current.x - cx) * 0.008
      const offsetY = reducedMotion ? 0 : (mouseRef.current.y - cy) * 0.008

      ctx.strokeStyle = "rgba(220, 200, 190, 0.035)"
      ctx.lineWidth = 0.5

      // Concentric rings
      for (let r = 1; r <= rings; r++) {
        const radius = (maxRadius / rings) * r
        ctx.beginPath()
        for (let a = 0; a <= radials; a++) {
          const angle = (Math.PI * 2 * a) / radials
          const distortion =
            1 + offsetX * Math.cos(angle) * 0.02 + offsetY * Math.sin(angle) * 0.02
          const x = cx + Math.cos(angle) * radius * distortion
          const y = cy + Math.sin(angle) * radius * distortion
          if (a === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }

      // Radial lines
      for (let a = 0; a < radials; a++) {
        const angle = (Math.PI * 2 * a) / radials
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        const distortion =
          1 + offsetX * Math.cos(angle) * 0.02 + offsetY * Math.sin(angle) * 0.02
        const x = cx + Math.cos(angle) * maxRadius * distortion
        const y = cy + Math.sin(angle) * maxRadius * distortion
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    },
    [reducedMotion]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function handleMouseMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener("resize", resize)
    if (!reducedMotion) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    function animate() {
      if (!canvas || !ctx) return
      draw(ctx, canvas.width, canvas.height)
      rafRef.current = requestAnimationFrame(animate)
    }

    if (reducedMotion) {
      draw(ctx, canvas.width, canvas.height)
    } else {
      animate()
    }

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [draw, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      role="presentation"
      aria-hidden="true"
    />
  )
}
