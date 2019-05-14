# Import dependencies 
import numpy as np 


def image_cropper(image):
    
    """ Takes in any rectangular shaped image, resizes it to a multiplier of 28x28 and cuts it into as many possible 
    28x28 images. """
    
    ## getting the nearest 28 mutplier and resizing the imge 
    # get x and y for the new shape
    x = image.shape[0] - image.shape[0]%28
    y = image.shape[1] - image.shape[1]%28

    # resized would start from zero and stop at the highest multiplier of 28 closest to original dimensions
    resized_image = image[0:x, 0:y,:]

    # print original image shape 
    print(f"Original image has a shape of: {image.shape}.")
    print("---"*30)
    # print resized image's shape 
    print(f"Resized image has a shape of: {resized_image.shape}.")
    print("---"*30)

    # number of sections we will get by splitting along side axis 0 or 'Horizontal', x
    horizontal_split = resized_image.shape[0] / 28


    # number of sections we would get by splitting vertically, axis 1, y
    vertical_split = resized_image.shape[1]/28

    # the product of the two gives us, the final number of resized 28 x 28 images  
    print(f"Number of resized 28 x 28 images: {int(horizontal_split * vertical_split)}.")
    print("---"*30)

    # splitting the resized image along side axis 1 (i.e column or vertical split)
    vertical_images = np.split(resized_image, indices_or_sections = vertical_split, axis=1)

    print(f"The resized image has been vertically divided into {len(vertical_images)} segments.")
    print("---"*30)
    print(f"The shape of one of those sections/images: {vertical_images[0].shape}.")
    print("---"*30)
    print(f"Each of these segments has been divided {horizontal_split} times to create 28 x 28 image.")
    print("---"*30)

    # empty list to hold ndarray for each section/image
    nested_list = []

    # loop through vertical images and split each horizontally
    for image in vertical_images:
        nested_list.append(np.split(image, indices_or_sections= horizontal_split, axis=0))

    # unpakc the nest list to become a list of 3d numpy arrays 
    image_list = list(itertools.chain(*nested_list))

    print("Done! Below is a 28x28 image from the top left corner of our resized image")

    # plot the 28 x 28 picture at the top left corner 
    plt.imshow(image_list[0])
    
    return image_list