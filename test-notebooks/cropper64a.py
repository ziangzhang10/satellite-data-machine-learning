# Import dependencies 
import numpy as np 
import itertools

def image_cropper(image): 
    
    """ Takes in any rectangular shaped image, resizes it to a multiplier of 64x64 and cuts it into as many possible 
    64x64 images. """
    
#     import numpy as np
    ## getting the nearest 64 mutplier and resizing the imge 
    # get x and y for the new shape
    x = image.shape[0] - image.shape[0]%64
    y = image.shape[1] - image.shape[1]%64

    # resized would start from zero and stop at the highest multiplier of 64 closest to original dimensions
    resized_image = image[0:x, 0:y,:]

    # print original image shape 
    print(f"Original image has a shape of: {image.shape}.")
    print("---"*30)
    # print resized image's shape 
    print(f"Resized image has a shape of: {resized_image.shape}.")
    print("---"*30)

    # number of sections we will get by splitting along side axis 0 or 'Horizontal', x
    horizontal_split = resized_image.shape[0] / 64


    # number of sections we would get by splitting vertically, axis 1, y
    vertical_split = resized_image.shape[1]/64

    # the product of the two gives us, the final number of resized 64 x 64 images  
    print(f"Number of resized 64 x 64 images: {int(horizontal_split * vertical_split)}.")
    print("---"*30)

    # splitting the resized image along side axis 1 (i.e column or vertical split)
    vertical_images = np.split(resized_image, indices_or_sections = vertical_split, axis=1)

#    print(f"The resized image has been vertically divided into {len(vertical_images)} segments.")
#    print("---"*30)
#    print(f"The shape of one of those sections/images: {vertical_images[0].shape}.")
#    print("---"*30)
#    print(f"Each of these segments has been divided {horizontal_split} times to create 64 x 64 image.")
#    print("---"*30)
#
    # empty list to hold ndarray for each section/image
    nested_list = []

    # loop through vertical images and split each horizontally
    for image in vertical_images:
        nested_list.append(np.split(image, indices_or_sections= horizontal_split, axis=0))

    # unpakc the nest list to become a list of 3d numpy arrays 
    image_list = list(itertools.chain(*nested_list))

#    print("Done! Below is a 64x64 image from the top left corner of our resized image")

    # plot the 64 x 64 picture at the top left corner 
#     plt.imshow(image_list[0])
    
    return image_list, int(horizontal_split), int(vertical_split)
