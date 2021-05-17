# Generated by Django 3.2 on 2021-05-16 13:13

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import events_board.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_extend', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventsBoard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=15)),
                ('subtitle', models.CharField(blank=True, max_length=25)),
                ('detail', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='events/')),
                ('create_date', models.DateField(default=datetime.date.today)),
                ('event_date', models.DateTimeField(blank=True, default=datetime.date.today, null=True)),
                ('people_limit', events_board.models.IntegerRangeField()),
                ('event_type', models.CharField(choices=[('activity', '活動'), ('project', '專案'), ('personal', '個人專案')], default='activity', max_length=10)),
                ('host', models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_host_name', to='user_extend.userextend')),
                ('likes', models.ManyToManyField(blank=True, related_name='event_like', to='user_extend.UserExtend')),
                ('participants', models.ManyToManyField(blank=True, default='', related_name='event_participant_name', to='user_extend.UserExtend')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=40)),
                ('rate', events_board.models.IntegerRangeField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='user_extend.userextend')),
                ('for_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='events_board.eventsboard')),
            ],
        ),
        migrations.CreateModel(
            name='BoardMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=50)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board_message', to='user_extend.userextend')),
                ('for_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board_message', to='events_board.eventsboard')),
            ],
        ),
    ]