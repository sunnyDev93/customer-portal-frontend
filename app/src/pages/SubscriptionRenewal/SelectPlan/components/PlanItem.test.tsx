import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PlanItem from 'pages/SubscriptionRenewal/SelectPlan/components/PlanItem';
import { PlanServiceStatus, SubscriptionPlan } from 'types/plan';

const basicPlan: SubscriptionPlan = {
  addons: [
    {
      addonId: '4',
      description: '$33 initial & additional $22 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/4/slug-snail-aphid.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=195d6b776f219166c13b9a53321d14ee46da356a5949f3c92ccb9e195116aaff',
      id: '4',
      initialTreatmentPrice: 33,
      name: 'Snail/Slug/Aphid',
      recurringPrice: 22,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '5',
      description: '$33 initial & additional $15 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/5/Rodent%20%28exterior%29.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=b4ea3624795e9be3ef5ea362d87b3bfdffe9ad276e466672f4a4632739fe96f6',
      id: '5',
      initialTreatmentPrice: 33,
      name: 'Outdoor Rodent (includes voles)',
      recurringPrice: 15,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '9',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/9/mosquito.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=d3f67919771f7f4f2a147c2b2aa31b488e70866e4abbefb1b630aedb2b0a1206',
      id: '9',
      initialTreatmentPrice: 0,
      name: 'Mosquitoes',
      recurringPrice: 49,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '12',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/12/Wood%20Shed.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=acd3121e742711a2c2c7046f26f26c16a3f2d56620e3ea60e4e2a8c2c3d93946',
      id: '12',
      initialTreatmentPrice: 0,
      name: 'Wood Shed',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '13',
      description: 'additional $5 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/13/Pantry%20Pests.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=abe0526fa59d887d8197cf8c51a025f4be6304d9267b26eed47b15a95f1b3b79',
      id: '13',
      initialTreatmentPrice: 0,
      name: 'Pantry Pests',
      recurringPrice: 5,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '14',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/14/Raised%20Deck.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=0555008867228221e63d70dafcd27f86d4d01bca121f8ef8c5f1498ece9eae9c',
      id: '14',
      initialTreatmentPrice: 0,
      name: 'Raised Deck',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '15',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/15/De-web%20%26%20Treat%203-car%2B%20Garage.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=78aa45e3d46d8358d0b3c4ac084f489c2c1053adc690f3b612414dd934e14c5c',
      id: '15',
      initialTreatmentPrice: 0,
      name: 'De-web & Treat 3-car+ Garage',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '17',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/17/Perimeter%20Fence.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=038d8c67093ae760600d0735bb1cce91ef6119d4577b0db304b03ed8527955b7',
      id: '17',
      initialTreatmentPrice: 0,
      name: 'Perimeter Fence',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '19',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/19/indoor-fly.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=77e15d7f452461a129fee551965b9a63fc34d5d9abc263413d594d983f5a5ae8',
      id: '19',
      initialTreatmentPrice: 0,
      name: 'Indoor Fly Trap Service',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '20',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/20/outdoor-wasp.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=7492fdff7ea6e76f6b82342bedf21b11c596a7f2f84cc102fa01940563314f46',
      id: '20',
      initialTreatmentPrice: 0,
      name: 'Outdoor Wasp Trap Service',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
  ],
  id: '31',
  name: 'Basic',
  order: 0,
  pricePerService: 0,
  initialTreatmentPrice: 0,
  treatmentFrequency: '4-5',
};
const proPlan: SubscriptionPlan = {
  addons: [
    {
      addonId: '4',
      description: '$33 initial & additional $22 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/4/slug-snail-aphid.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=195d6b776f219166c13b9a53321d14ee46da356a5949f3c92ccb9e195116aaff',
      id: '4',
      initialTreatmentPrice: 33,
      name: 'Snail/Slug/Aphid',
      recurringPrice: 22,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '5',
      description: '$33 initial & additional $15 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/5/Rodent%20%28exterior%29.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=b4ea3624795e9be3ef5ea362d87b3bfdffe9ad276e466672f4a4632739fe96f6',
      id: '5',
      initialTreatmentPrice: 33,
      name: 'Outdoor Rodent (includes voles)',
      recurringPrice: 15,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '9',
      description: 'additional $49 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/9/mosquito.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=d3f67919771f7f4f2a147c2b2aa31b488e70866e4abbefb1b630aedb2b0a1206',
      id: '9',
      initialTreatmentPrice: 0,
      name: 'Mosquitoes',
      recurringPrice: 49,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '12',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/12/Wood%20Shed.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=acd3121e742711a2c2c7046f26f26c16a3f2d56620e3ea60e4e2a8c2c3d93946',
      id: '12',
      initialTreatmentPrice: 0,
      name: 'Wood Shed',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '13',
      description: 'additional $5 / per service',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/13/Pantry%20Pests.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=abe0526fa59d887d8197cf8c51a025f4be6304d9267b26eed47b15a95f1b3b79',
      id: '13',
      initialTreatmentPrice: 0,
      name: 'Pantry Pests',
      recurringPrice: 5,
      status: PlanServiceStatus.Enable,
    },
    {
      addonId: '14',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/14/Raised%20Deck.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=0555008867228221e63d70dafcd27f86d4d01bca121f8ef8c5f1498ece9eae9c',
      id: '14',
      initialTreatmentPrice: 0,
      name: 'Raised Deck',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '15',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/15/De-web%20%26%20Treat%203-car%2B%20Garage.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=78aa45e3d46d8358d0b3c4ac084f489c2c1053adc690f3b612414dd934e14c5c',
      id: '15',
      initialTreatmentPrice: 0,
      name: 'De-web & Treat 3-car+ Garage',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '17',
      description: 'upgrade to Pro or higher',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/17/Perimeter%20Fence.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=038d8c67093ae760600d0735bb1cce91ef6119d4577b0db304b03ed8527955b7',
      id: '17',
      initialTreatmentPrice: 0,
      name: 'Perimeter Fence',
      recurringPrice: 0,
      status: PlanServiceStatus.Disabled,
    },
    {
      addonId: '19',
      description: '',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/19/indoor-fly.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=77e15d7f452461a129fee551965b9a63fc34d5d9abc263413d594d983f5a5ae8',
      id: '19',
      initialTreatmentPrice: 0,
      name: 'Indoor Fly Trap Service',
      recurringPrice: 0,
      status: PlanServiceStatus.Included,
    },
    {
      addonId: '20',
      description: '',
      iconSrc:
        'https://s3.amazonaws.com/aptive.staging-01.product-manager-api.bucket/product_images/20/outdoor-wasp.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQC41NOFqdhV8x5KGg28eCLlnYCzUBaVvqzT6eWoxa1cHQIgBaE7qGVpqjlFOvAYA3X3GhccehNy0GcXZC%2FwTSLmIGMqlwUISBADGgw4MjU3NDQ5MjM5ODQiDGwye5zqPUZW%2BfffXyr0BOIO6z4JIowtgINH8XiVpYl7Tf3YGqw1eT1waG1hZgJF3z6ebJta49YTh9w55rWjhkse2io%2FaTmnxfUPkvFZzGTQx9lU4azN1e7CR7vA1N8MKkd7eSvfz1jlt88wSBs3g64Jc%2BejnazOWigp5J4ntCbHRbRVC%2B59RYglSKVMAObA0%2FG8YDle5blDpBSniDxueLN3TnSkRrt2UUrFIeuW6yMltRSqNxZdOnFpKX%2FGau39MJVwFaba%2FKQgcp0uPo2T9pLGZMlb73NBqSHXa3CFjWUvk3xc%2Fj8lK815qNHeTHSXaOzuZ1mK9KEz94FZA27iTSFhFQGnFdxqItG6yxeYImktPBAwWeMgpfai2V7FhE4c%2BBjTKaBxQM8o%2BwCn31flPQJWmLQzn4a097uchy91MsOO4VQiSjzf6ixi7EfxZNXwgdohOqMN%2FJ4OcPpRxpVOFCGDAFgOhDO1OeJDsgk06e2CFErp6WzBVAOhX34U4qWh8qmut%2B1bzpHts4fhlpOwraI1HtUFV7sAenB1%2Bon8c0rO5u2Kld7ah6UctyXv7fLnY8Eh6cmBIUEJ5UAyyFka6TarqLB%2BECNJRJGqtePbWk0TSjoCJws9TF2PNGaoFIazXMuhUzxd45%2FAfjD66%2FIq5%2BMtLRfowMeeh2fvyoLOpl%2F0HCPe5aLyAdYg5wVM10pTbgtHKoUzE1PVSx8mnkgBOxZmYry5cqvGx8Kck6lB1AiQnBITO1stOGk79WAClVaw0thfSLpP%2F0s%2BgYSJcbT6cY1es63CYpN7JyTKHkSqZ5PEFjmJmtQjvLnDOGiyyCKzPLgd9uikbxzVTIXgXEiIGtkYYlMwx52UqgY6mwFycW0tFiAQEckgnS3PUj2BziFIqj3EarXSPWH6upT3Xr6%2FfqjQ8dNKCyrAnTlw%2B1%2FrJ4gw8FrmQiQEoxY0IwQHDgYzWxnT%2F5ErhKOy1OgK%2BSwFIBgcbSyD26mbN1skLLLAGJvBSQJPXcInZiT7csUhy3oClF2YM49ZbJfqAVf6wqzgwtBj4pe3Jzbb7B%2FABLsIQEizQwUH9DXe%2BQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4AQR3TVIOTLXBXGK%2F20231103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T151623Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=7492fdff7ea6e76f6b82342bedf21b11c596a7f2f84cc102fa01940563314f46',
      id: '20',
      initialTreatmentPrice: 0,
      name: 'Outdoor Wasp Trap Service',
      recurringPrice: 0,
      status: PlanServiceStatus.Included,
    },
  ],
  id: '22',
  name: 'Pro',
  order: 1,
  pricePerService: 125,
  initialTreatmentPrice: 125,
  treatmentFrequency: '6-7',
};
export const userPlanList: SubscriptionPlan[] = [basicPlan, proPlan];
const plan = userPlanList[0];

describe('PlanItem', () => {
  it('should render normally', () => {
    render(<PlanItem plan={plan} />);

    const nameLabel = screen.getByText(plan.name);
    const button = screen.getByText('Select plan');

    expect(nameLabel).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render as selected plan', () => {
    render(<PlanItem plan={plan} isCurrentPlan />);

    const nameLabel = screen.getByText(plan.name);
    const button = screen.getByText('Current plan');

    expect(nameLabel).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call function onSelect plan', () => {
    const mockOnSelect = jest.fn();
    render(<PlanItem plan={plan} onSelect={mockOnSelect} />);

    const button = screen.getByText('Select plan');

    fireEvent.click(button);

    expect(mockOnSelect).toBeCalled();
  });
});
