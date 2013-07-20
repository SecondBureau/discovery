namespace :assets do
  task :precompile do
    sh "middleman build"
  end
  
  task :compile_thumbnails do
    require 'RMagick'
    include Magick
    root = File.expand_path(File.join('..', 'source', 'images', 'slideshow'), __FILE__)
    src_path = File.join(root, 'original')
    tar_path = File.join(root, 'thumbnails')
    pattern = File.join '**', "*.{jpg,png}"
    Dir.chdir src_path do
      Dir.glob(pattern).each do |i|
        img = Magick::Image.read(File.join(src_path, i)).first
        thumb = img.scale(0.25)
        tar_filename = File.join(tar_path, i)
        FileUtils.mkdir_p(File.dirname(tar_filename))
        thumb.write tar_filename
      end
    end
  end
end