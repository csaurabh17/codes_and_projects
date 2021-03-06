function imageviewer(selector = 'img')
{
    selector = $(selector);

    selector.click(function () {

        let imageLink = $(this).attr('src');

        if (imageLink === '')
            return console.warn('[ImageViewer] Invalid link to image');

        $('<div>', {
            id: 'imageviewer-wrapper',
            css: {
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: '99999',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
            },
            append: $('<img>', {
                id: 'imageviewer-image',
                src: imageLink,
            }).add($('<div>', {
                id: 'imageviewer-close',
                css: {
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    zIndex: '100000',
                    width: '40px',
                    height: '40px',
                    padding: '20px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    translation: '0.5s ease',
                },
                append: $('<div>', {
                    css: {
                        width: '100%',
                        height: '100%',
                        float: 'right',
                        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImZpbGw6I2ZmZjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnPjxwYXRoIGQ9Ik0yODQuMjg2LDI1Ni4wMDJMNTA2LjE0MywzNC4xNDRjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1Yy03LjgxMS03LjgxLTIwLjQ3NS03LjgxMS0yOC4yODUsMEwyNTYsMjI3LjcxN0wzNC4xNDMsNS44NTljLTcuODExLTcuODExLTIwLjQ3NS03LjgxMS0yOC4yODUsMGMtNy44MSw3LjgxMS03LjgxMSwyMC40NzUsMCwyOC4yODVsMjIxLjg1NywyMjEuODU3TDUuODU4LDQ3Ny44NTljLTcuODExLDcuODExLTcuODExLDIwLjQ3NSwwLDI4LjI4NWMzLjkwNSwzLjkwNSw5LjAyNCw1Ljg1NywxNC4xNDMsNS44NTdjNS4xMTksMCwxMC4yMzctMS45NTIsMTQuMTQzLTUuODU3TDI1NiwyODQuMjg3bDIyMS44NTcsMjIxLjg1N2MzLjkwNSwzLjkwNSw5LjAyNCw1Ljg1NywxNC4xNDMsNS44NTdzMTAuMjM3LTEuOTUyLDE0LjE0My01Ljg1N2M3LjgxMS03LjgxMSw3LjgxMS0yMC40NzUsMC0yOC4yODVMMjg0LjI4NiwyNTYuMDAyeiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }
                }),
                on: {
                    click: function (event) {
                        $('#imageviewer-wrapper').remove();
                    }
                }
            })),
        }).appendTo('body');

    });
}