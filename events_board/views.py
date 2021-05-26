from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .models import EventsBoard, BoardMessage
from site_notification.models import SiteNotification
from .forms import EventCreateForm
from user_extend.models import UserExtend
from datetime import datetime, timedelta
from django.forms.models import model_to_dict


# Create your views here.
def home_view(requests, *args, **kwargs):
  obj = EventsBoard.objects.order_by('-create_date')
  form = EventCreateForm(requests.POST, requests.FILES or None)
  if(requests.user.is_authenticated):
    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
  else:
    notification = None

  if form.is_valid():
    instance = form.save(commit=False)
    instance.host = requests.user.userextend
    instance.save()
  
  context = {
    'event_obj': obj,
    'form': form,
    'notice': notification,
  }
  return render(requests, 'homepage.pug', context)


#def event_detail_view(requests, id, *args, **kwargs):
#  obj = EventsBoard.objects.order_by('-create_date')
#  event_detail = EventsBoard.objects.get(id=id)
#  form = EventCreateForm(requests.POST, requests.FILES or None)
#  if(requests.user.is_authenticated):
#    notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
#  else:
#    notification = None
#
#  if form.is_valid():
#    instance = form.save(commit=False)
#    instance.host = requests.user.userextend
#    instance.save()
#    return HttpResponseRedirect('/')
#  context = {
#    'event_obj': obj,
#    'form': form,
#    'event_detail': event_detail,
#    'notice': notification,
#  }
#  return render(requests, 'homepage.pug', context)
  
  
def event_detail_view(requests, id):
  if requests.method == "POST":
    event = get_object_or_404(EventsBoard, id=id)
    
    image_url =  event.image.url if event.image != "" else None
    event_detail = event.detail if event.detail != "" else None
    likes = list(event.likes.all().values())
    participants = list(event.participants.all().values())
    host =  model_to_dict(event.host, fields=['id', 'full_name', 'image_url'])
    print(host)
    
    
    return JsonResponse({
      'title': event.title,
      'subtitle': event.subtitle,
      'host': host,
      'image': image_url,
      'detail': event_detail,
      'create_date': event.create_date,
      'event_date': event.event_date,
      'likes': likes,
      'participants': participants,
      'host_id': event.host.pk,
      'host_pic': event.host.img.url,
      
      
      'status': 200,
      'error_message': 'No error'
    })
  return JsonResponse({
    'status': 404,
    'error_message': 'Not ajax request'
  })

# # functional view
# def like_view(requests, id):
#   prev_url = requests.META.get('HTTP_REFERER')
#   url_split = prev_url.split('/')
#   caller_type = url_split[3]

#   print(url_split)
#   event = get_object_or_404(EventsBoard, id=requests.POST.get('event_id'))
#   if event.likes.filter(id=requests.user.userextend.id).exists():
#     event.likes.remove(requests.user.userextend)
#   else:
#     event.likes.add(requests.user.userextend)
#     receiver = event.host.user
#     sender = requests.user
#     notification = SiteNotification.objects.create(
#       text = sender.userextend.full_name + "對您的活動感到有興趣， 快去看看吧",
#       event = event,
#       for_user = receiver,
#       from_user = sender
#     )
#     notification.save()
#   if caller_type == "event":
#     return HttpResponseRedirect(reverse('event_detail', args=[str(id)]))
#   else:
#     return HttpResponseRedirect(reverse('profile_event', args=[url_split[4], str(id)]))

# Ajax function
def like_view(request):
  if request.is_ajax() and request.method == 'POST':
    data = request.POST
    event = get_object_or_404(EventsBoard, id=data.get('event_id'))
    
    if event.likes.filter(id=request.user.userextend.id).exists():
      event.likes.remove(request.user.userextend)
      return JsonResponse({
        'add': False,
        'remove': True,
        'user_img_url': request.user.userextend.img.url,
        'status': 200
      })
    else:
      event.likes.add(request.user.userextend)
      receiver = event.host.user
      sender = request.user
      notification = SiteNotification.objects.create(
        text = sender.userextend.full_name + "對您的活動感到有興趣， 快去看看吧",
        event = event,
        for_user = receiver,
        from_user = sender
      )
      notification.save()
      return JsonResponse({
        'add': True,
        'remove': False,
        'user_img_url': request.user.userextend.img.url,
        'user_id': request.user.userextend.id,
        'status': 200
      })
  return JsonResponse({
    'status': 404,
    'error_message': 'Not ajax request'
  })
  

# #functional view
# def comment_view(requests, event_id, id):
#   if requests.method == "POST":
#     event = get_object_or_404(EventsBoard, id=event_id)
#     author = UserExtend.objects.get(id=id)
#     if (requests.POST.get('text')) != "":
#       comment_obj = BoardMessage.objects.create(
#         author = author,
#         for_event = event,
#         text = requests.POST.get('text')
#       )
#       comment_obj.save()
#   return HttpResponseRedirect(reverse('event_detail', args=[str(event_id)]))

# ajax viewc
def comment_view(requests, event_id, id):
  if requests.method == "POST":
    event = get_object_or_404(EventsBoard, id=event_id)
    author = UserExtend.objects.get(id=id)
    data = requests.POST
    if (data.get('text')) != "":
      comment_obj = BoardMessage.objects.create(
        author = author,
        for_event = event,
        text = data.get('text')
      )
      comment_obj.save()
    return JsonResponse({
      'author': author.id,
      'author_img_url': author.img.url,
      'author_name': author.full_name,
      'msg_date': (comment_obj.date + timedelta(hours=8)).strftime("%b %d, %Y, %-I:%-M %p")
    })


def search_view(requests):
  if requests.method == "GET":
    events = EventsBoard.objects.filter(
      title__contains=requests.GET.get('search'),
    )
    events_sub = EventsBoard.objects.filter(
      subtitle__contains=requests.GET.get('search'),
    )
    events_detail = EventsBoard.objects.filter(
      detail__contains=requests.GET.get('search'),
    )
    events = events.union(events_sub).union(events_detail)
    form = EventCreateForm(requests.POST, requests.FILES or None)
    if(requests.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = requests.user.userextend
      instance.save()
    
    context = {
      'event_obj': events,
      'form': form,
      'notice': notification,
    }
    return render(requests, 'homepage.pug', context)

  return HttpResponseRedirect('/')

def order_view(requests):
  if requests.method == 'GET':
    selected_item = requests.GET['order']
    print(selected_item)
    obj = EventsBoard.objects.order_by('-create_date')
    if (selected_item == 'newest'):
      obj = EventsBoard.objects.order_by('-create_date')
    elif (selected_item == 'recent'):
      obj = EventsBoard.objects.order_by('-event_date')
    elif (selected_item == 'most-like'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_likes())
    elif (selected_item == 'most-participant'):
      unsorted_obj = EventsBoard.objects.all()
      obj = sorted(unsorted_obj, key=lambda t: -t.number_of_participants())

    form = EventCreateForm(requests.POST, requests.FILES or None)
    if(requests.user.is_authenticated):
      notification = SiteNotification.objects.filter(for_user = requests.user).order_by('-date')
    else:
      notification = None

    if form.is_valid():
      instance = form.save(commit=False)
      instance.host = requests.user.userextend
      instance.save()
    
    context = {
      'event_obj': obj,
      'form': form,
      'notice': notification,
    }
    return render(requests, 'homepage.pug', context)
