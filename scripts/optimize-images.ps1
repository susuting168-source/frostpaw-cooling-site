param(
  [string]$ImageDirectory = (Join-Path $PSScriptRoot "..\assets\images")
)

Add-Type -AssemblyName System.Drawing

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object MimeType -eq "image/jpeg"

function Save-OptimizedJpeg {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$MaxDimension,
    [int]$Quality
  )

  $temporary = "$Destination.tmp.jpg"
  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $scale = [Math]::Min(1.0, [double]$MaxDimension / [Math]::Max($sourceImage.Width, $sourceImage.Height))
    if ($scale -ge 1 -and [IO.Path]::GetFullPath($Source) -eq [IO.Path]::GetFullPath($Destination)) {
      return
    }
    $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $width, $height)
      } finally {
        $graphics.Dispose()
      }

      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality,
        [long]$Quality
      )
      $bitmap.Save($temporary, $jpegEncoder, $parameters)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }

  Move-Item -LiteralPath $temporary -Destination $Destination -Force
}

$pngProducts = Get-ChildItem $ImageDirectory -Filter "product-*.png" |
  Where-Object Name -ne "packaging-mockup.png"

foreach ($image in $pngProducts) {
  $destination = [System.IO.Path]::ChangeExtension($image.FullName, ".jpg")
  Save-OptimizedJpeg $image.FullName $destination 900 82
  Remove-Item -LiteralPath $image.FullName -Force
}

Get-ChildItem $ImageDirectory -Filter "app-*.jpg" | ForEach-Object {
  Save-OptimizedJpeg $_.FullName $_.FullName 640 80
}

Get-ChildItem $ImageDirectory -Filter "product-*.jpg" | ForEach-Object {
  Save-OptimizedJpeg $_.FullName $_.FullName 900 82
}

Get-ChildItem $ImageDirectory -Filter "hero-slide-*.jpg" | ForEach-Object {
  Save-OptimizedJpeg $_.FullName $_.FullName 1400 82
}

Write-Host "Image optimization complete."
