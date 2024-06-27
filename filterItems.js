let hiddenItems = [];
let favouriteItems = [];
let comparedItems = [];
let showHidden = false;
let activeButton;

let checkbox = document.getElementById('showHidden');
checkbox.addEventListener('change', function () {
    showHidden = this.checked;
    filterItemsByActiveButton();
});

let visibilityIcons = document.querySelectorAll('.catalog__item-content-icon-visibility');
visibilityIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
        let _target = e.target.closest('.catalog__item-content-icon-visibility');
        let catalogItem = _target.closest('.catalog__item');

        toggleIcon(_target, hiddenItems, [_target, _target.children[0]], catalogItem.id);

        if (catalogItem.classList.contains('catalog__item_opaque')) {
            catalogItem.classList.remove('catalog__item_opaque');
        } else {
            catalogItem.classList.add('catalog__item_opaque');
        }

        if (!showHidden) {
            catalogItem.classList.add('catalog__item_invisible');
        }
    });
});

let favouriteIcons = document.querySelectorAll('.catalog__item-content-icon-favourites');
favouriteIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
        let _target = e.target.closest('.catalog__item-content-icon-favourites');
        let catalogItem = _target.closest('.catalog__item');

        toggleIcon(_target, favouriteItems, [_target, _target.children[0]], catalogItem.id);
    });
});

let comparisonIcons = document.querySelectorAll('.catalog__item-content-icon-comparison');
comparisonIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
        let _target = e.target.closest('.catalog__item-content-icon-comparison');
        let catalogItem = _target.closest('.catalog__item');

        toggleIcon(_target, comparedItems, [_target, _target.children[0]], catalogItem.id);
    });

});

function deleteArrayElement(element, array) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function toggleIcon(_target, array, elements, id) {
    if (_target.classList.contains('catalog__item-content-icon_active')) {
        elements.forEach(function (element) {
            element.classList.remove('catalog__item-content-icon_active');
        });

        deleteArrayElement(id, array);
    } else {
        elements.forEach(function (element) {
            element.classList.add('catalog__item-content-icon_active');
        });

        array.push(id);
    }
}

function changeAllItemsVisibility() {
    hiddenItems.forEach(function (item) {
        let element = document.getElementById(item);
        let parent = element.closest('.catalog__item');
        if (showHidden) {
            parent.classList.remove('catalog__item_invisible');
        } else {
            parent.classList.add('catalog__item_invisible');
        }
    });
}

let filterButtons = document.querySelector('.filter_buttons');
filterButtons.addEventListener('click', function (e) {
    let _target = e.target;
    if (_target.tagName === 'BUTTON' && !_target.classList.contains('filter-button_active')) {
        activeButton = _target;
        document.querySelectorAll('.filter-button').forEach(function (button) {
            if (button.dataset.filter === _target.dataset.filter) {
                button.classList.add('filter-button_active');
            } else {
                button.classList.remove('filter-button_active');
            }
        });
        filterItemsByActiveButton();
    }
});

function filterItemsByActiveButton() {
    if (activeButton !== undefined) {
        document.querySelectorAll('.catalog__item').forEach(function (item) {
            switch (activeButton.dataset.filter) {
                case 'all':
                    toggleItemVisibility(item);
                    break;
                case 'favourites':
                    if (favouriteItems.includes(item.id)) {
                        toggleItemVisibility(item);
                    } else {
                        item.classList.add('catalog__item_invisible');
                    }
                    break;
                case 'comparison':
                    if (comparedItems.includes(item.id)) {
                        toggleItemVisibility(item);
                    } else {
                        item.classList.add('catalog__item_invisible');
                    } 
                    break;
            }
        });
    } else {
        changeAllItemsVisibility();
    }
}

function toggleItemVisibility(item) {
    if (hiddenItems.includes(item.id) && !showHidden) {
        item.classList.add('catalog__item_invisible');
    } else {
        item.classList.remove('catalog__item_invisible');
    }
}